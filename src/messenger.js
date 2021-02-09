'use strict';
const https = require('https')

const messageFormatter = require('./messageFormatter');

const send_message_to_telegram = (botId, chatId, message) => {
  console.log('----------------------------------------\n');
  console.log(message);
  console.log('----------------------------------------\n');
  if ( botId && chatId && message) {
    const url = `https://api.telegram.org/bot${botId}/sendMessage?chat_id=-${chatId}&text=${'navin:'+encodeURI(message)}&parse_mode=html`
    const req = https.request(url, res => {
      res.on('data', () => {
        console.log("Message Sent");
      })
    })
    
    req.on('error', error => {
      console.error('Message Sent Error:-')
      console.error(error)
    })
    req.end();
  }
}


const messagingModes = {
  instant: 'INSTANT',
  collecting: 'COLLECTING',
} 

function DebounceEngine (config) {

  const self=this;
  let debIntHandler;
  const debBucket =[];
  const eventTraffic={
    lastMessageTimeStamp:null,
    consistentViolationCount:0,
  }

  const violationTime=config.violationTime || config.violationTime !==0 ?   5000: config.violationTime;
  const violationCount=config.violationCount || config.violationCount !==0 ?   8: config.violationCount;
  const debounceTime=config.debounce || config.debounce !==0 ?   30000: config.debounce;



  const init = () => {
    self.startUp();
  }
  const flushDebBucket = () => {
    const debBucketQueueCount = debBucket.length;

    if(debBucketQueueCount){
      console.log('Flushing DebounceBucket Queue');
      while(debBucket.length){
        const msgNode=debBucket.shift();
        send_message_to_telegram(config.bot_token, config.chat_id, msgNode.msg)
      }
    } else {
      if(debIntHandler){
        console.log('Nothing to Flush as DebounceEngine Queue is empty, Shutting down Engine')
        self.shutDown();
      }
    }
  };

  self.addToQueue=(msg) => {
    if(!debIntHandler){
      console.log('DebounceEngine is not running, invoking startup to get it up and running');
      self.startUp()
    }
    const lastMessage = debBucket[debBucket.length-1];
    if(lastMessage && lastMessage.msg ===msg ){
      lastMessage.count+=1;
    } else {
      msg+=`\n-${(new Date()).toString()}`;
      debBucket.push({msg, count:0})
    }
  }
  self.startUp=() => {
    if(!debIntHandler){
      debIntHandler=setInterval(flushDebBucket,debounceTime);
      console.log(`Running DebounceEngine with a debounce of ${debounceTime} milliseconds`);
    } else {
      console.log('DebounceEngine is already running')
    }
  }
  self.shutDown=() => {
    debIntHandler && clearInterval(debIntHandler);
    debIntHandler=null;
    flushDebBucket(); 
  }
  self.isDebounceNeeded=() => {
    const currentDateTime=(new Date()).getTime();
    if(eventTraffic.lastMessageTimeStamp && (currentDateTime - eventTraffic.lastMessageTimeStamp)<=violationTime){
      eventTraffic.consistentViolationCount++;
    }else {
      eventTraffic.consistentViolationCount=0;
    }
    eventTraffic.lastMessageTimeStamp=currentDateTime;
    return eventTraffic.consistentViolationCount >= violationCount
  }

  init();
}





const Messenger = (config) => {
  const self = this;
  console.log('Initializing pm2-telegram-notification')
  
  const debounceEngine = new DebounceEngine(config);
  // console.log('messenger-config', config)
  const send = (data) => {
    const msg = messageFormatter(data, config.server_name);
    self.messaging_mode = debounceEngine.isDebounceNeeded()? messagingModes.collecting:messagingModes.instant;
    console.log('-----------========########========------------>>>>>Messaging Mode='+self.messaging_mode);
    if (self.messaging_mode ==  messagingModes.instant) {
      // console.log('TRIGGERED->message=>', message);
      // console.log('TRIGGERED->pm2_event=>', pm2_event);
      send_message_to_telegram(config.bot_token, config.chat_id, msg)
    } else {
      debounceEngine.addToQueue(msg);
    }
  };
  return { send }
};

module.exports = Messenger;