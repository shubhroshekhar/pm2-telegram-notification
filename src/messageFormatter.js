'use strict';

const MessageFormatter = ({ type, data }, serverName) => {
  let message = '';
  if (serverName) {
    message = `<b>Server : <u>${serverName}</u></b>\n`;
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
    message += `<b>${serviceName}</b> ${event}\n`;
  }
  // if (count && count > 1) {
  //   message += `(${count}) times\n`;
  // }
  return message
};

module.exports = MessageFormatter;