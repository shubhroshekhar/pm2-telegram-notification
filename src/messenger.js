'use strict';
const https = require('https')

const messageFormatter = require('./messageFormatter');

const send_message_to_telegram = (botId, chatId, message) => {
  if (botId && chatId && message) {
    const data = JSON.stringify({
      chat_id: `${chatId}`.replace("g",""),
      text: message,
      parse_mode:'html'
    })
    const options = {
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${botId}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    }
    const req = https.request(options, res => {
      res.on('data', () => {
        console.log('Message Sent');
      })
    })
    
    req.on('error', error => {
      console.error('Message Sent Error:-')
      console.error(error)
    })
    
    req.write(data)
    req.end()
  }
}


const messagingModes = {
  instant: 'INSTANT',
  collecting: 'COLLECTING',
} 



function DebounceEngine (config) {

  const self=this;
  let deb_int_handler;
  const deb_bucket =[];
  const event_traffic={
    last_message_time_stamp:null,
    consistent_violation_count:0,
  }

  const violation_time=config.violation_time || config.violation_time !==0 ? 5000: config.violation_time;
  const violation_count=config.violation_count || config.violation_count !==0 ? 8: config.violation_count;
  const debounce_time=config.debounce || config.debounce !==0 ? 30000: config.debounce;
  const telegram_message_length_limit = 3500;


  const init = () => {
    self.start_up();
  }
  const flush_deb_bucket = () => {
    const deb_bucket_queue_count = deb_bucket.length;

    if(deb_bucket_queue_count){
      console.log('Flushing DebounceBucket Queue');
      append_format_send_message();
    } else {
      if(deb_int_handler){
        console.log('Nothing to Flush as DebounceEngine Queue is empty, Shutting down Engine')
        self.shut_down();
      }
    }
  };
  const append_format_send_message= () => {
    let message_to_be_sent='';
    while(deb_bucket.length){
      const msg_node=deb_bucket.shift();
      const countSuffix=msg_node.count? `(${msg_node.count})`:'';
      const formatted_message=`${msg_node.timestamp} | ${msg_node.msg}\n${countSuffix}\n\n`
      if((message_to_be_sent.length+formatted_message.length)>telegram_message_length_limit){
        send_message_to_telegram(config.bot_token, config.chat_id, message_to_be_sent)
        message_to_be_sent='';
      }
      message_to_be_sent+=formatted_message;
    }
    if(message_to_be_sent.length){
      send_message_to_telegram(config.bot_token, config.chat_id, message_to_be_sent)
    }
  };

  self.add_to_queue=(msg) => {
    if(!deb_int_handler){
      console.log('DebounceEngine is not running, invoking startup to get it up and running');
      self.start_up()
    }
    const last_message = deb_bucket[deb_bucket.length-1];
    if(last_message && last_message.msg ===msg ){
      last_message.count+=1;
      last_message.timestamp=(new Date()).toString()
    } else {
      deb_bucket.push({msg, count:0, timestamp:(new Date()).toString()})
    }
  }
  self.start_up=() => {
    if(!deb_int_handler){
      deb_int_handler=setInterval(flush_deb_bucket,debounce_time);
      console.log(`Running DebounceEngine with a debounce of ${debounce_time} milliseconds`);
    } else {
      console.log('DebounceEngine is already running')
    }
  }
  self.shut_down=() => {
    deb_int_handler && clearInterval(deb_int_handler);
    deb_int_handler=null;
    flush_deb_bucket(); 
  }
  self.is_debounce_needed=() => {
    const current_date_time=(new Date()).getTime();
    if(event_traffic.last_message_time_stamp && (current_date_time - event_traffic.last_message_time_stamp)<=violation_time){
      event_traffic.consistent_violation_count++;
    }else {
      event_traffic.consistent_violation_count=0;
    }
    event_traffic.last_message_time_stamp=current_date_time;
    return event_traffic.consistent_violation_count >= violation_count
  }

  init();
}





const Messenger = (config) => {
  const self = this;
  console.log('Initializing pm2-telegram-notification')
  
  const debounce_engine = new DebounceEngine(config);
  const send = (data) => {
    const msg = messageFormatter(data, config);
    self.messaging_mode = debounce_engine.is_debounce_needed()? messagingModes.collecting:messagingModes.instant;
    console.log('Messaging Mode set as='+self.messaging_mode);
    if (self.messaging_mode ==  messagingModes.instant) {
      send_message_to_telegram(config.bot_token, config.chat_id, msg)
    } else {
      debounce_engine.add_to_queue(msg);
    }
  };
  return { send }
};

module.exports = Messenger;