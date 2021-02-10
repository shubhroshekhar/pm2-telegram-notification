'use strict';

const MessageFormatter = ({ type, data }, serverName) => {
  let message = '';
  if (serverName) {
    message = `\n\n<b>Server : <u>${serverName}</u></b>\n`;
  }
  if (type === 'EVENT') {
    const serviceName = data.process.name;
    let event = '';
    switch (data.event) {
      case 'start':
        event = 'has started';
        break;
      case 'stop':
        event = 'has stopped';
        break;
      case 'restart':
        event = 'has restarted';
        break;
      case 'online':
            event = 'is online';
            break;
      case 'restart overlimit':
        event = 'has been stopped. Check and fix the issue.';
        break;
      case 'exit':
          return null;
    }
    message += `<i>${serviceName}</i> ${event}\n`;
  }

  if (type === 'LOG_ERROR') {
    const serviceName = data.process.name;
    let log = data.data || "";
    if (log.length > 3500) {
      const logId = `LOG_ID-${parseInt(Math.random()*1000000000,10)}`;
      console.log(logId);
      console.log('\n');
      console.log(log);
      log =`${logId}\n${log.substring(0, 3500)}`;
    }
    message += `<i>${serviceName}</i> log\n<code>${log}</code>\n`;
  }
  return message
};

module.exports = MessageFormatter;