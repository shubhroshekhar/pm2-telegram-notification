[![Bot API](https://img.shields.io/badge/Bot%20API-v.5.0-00aced.svg?style=flat-square&logo=telegram)](https://core.telegram.org/bots/api)
[![npm package](https://img.shields.io/npm/v/pm2-telegram-notification?logo=npm&style=flat-square)](https://www.npmjs.com/package/pm2-telegram-notification)


# What is pm2-telegram-notification ?
Send server logs to a telegram group/chat.
works with pm2 process manager.


# Installation
`pm2 install pm2-telegram-notification`

# How to Use
## Telegram setup 
* create a telegram bot [link](https://core.telegram.org/bots#creating-a-new-bot)
* add that bot to a group if you want to send logs to a group
* get chat_id
    - to get chat_id use `https://api.telegram.org/bot<BOT_TOKEN>/getUpdates` api

## pm2-telegram-notification setup
* install pm2-telegram-notification
-- `pm2 install pm2-telegram-notification`
* configure bot token
--  `pm2 set pm2-telegram-notification:bot_token BOT_TOKEN`
* configure chat id
--  `pm2 set pm2-telegram-notification:chat_id CHAT_ID`
    - if its a group chat id append
    
        eg: 
     
        group chat _CHAT_ID_ = `123456` -> `g-123456`
        
        personal chat _CHAT_ID_ = `123456` -> `123456`
* configure server name _(optional)_
--`pm2 set pm2-telegram-notification:server_name SERVER_NAME`
* configure lifecycle _(optional)_ default: true
--`pm2 set pm2-telegram-notification:lifecycle (true/false)`
* configure error _(optional)_ default: true
--`pm2 set pm2-telegram-notification:error (true/false)`
* configure error_log _(optional)_ default: true
--`pm2 set pm2-telegram-notification:error_log (true/false)`

#### Configuration defination 😎
```
server_name = name of the server   
bot_token=
chat_id=
lifecycle: true,
error: true,
error_log: true,
violation_time: 10000,
violation_count: 8,
debounce: 30000
```

