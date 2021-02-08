'use strict';
const https = require('https')

const send_message_to_telegram = (botId, chatId, message) => {
  if ( botId && chatId && message) {
    const url = `https://api.telegram.org/bot${botId}/sendMessage?chat_id=-${chatId}&text=${encodeURI(message)}`
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

const Messenger = (config) => {
  const self = this;
  self.message_queue = [];
  self.messaging_mode = messagingModes.instant;
  console.log('Initializing pm2-telegram-notification')
  console.log('messenger-config', config)
  const send = (pm2_event, message) => {
    if (self.messaging_mode ==  messagingModes.instant) {
      console.log('TRIGGERED->message=>', message);
      console.log('TRIGGERED->pm2_event=>', pm2_event);
      send_message_to_telegram(config.bot_token, config.chat_id, `${message}-${pm2_event}`)
    }
  };
  return { send }
};

module.exports = Messenger;