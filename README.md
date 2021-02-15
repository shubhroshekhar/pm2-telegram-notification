[![Bot API](https://img.shields.io/badge/Bot%20API-v.5.0-00aced.svg?style=flat-square&logo=telegram)](https://core.telegram.org/bots/api)
[![npm package](https://img.shields.io/npm/v/pm2-telegram-notification?logo=npm&style=flat-square)](https://www.npmjs.com/package/pm2-telegram-notification)
[![Build Status](https://api.travis-ci.org/shubhroshekhar/pm2-telegram-notification.svg?branch=main&status=created)](https://travis-ci.org/github/shubhroshekhar/pm2-telegram-notification)
[![Contributors][contributors-shield]][contributors-url]
<!-- [![Forks][forks-shield]][forks-url] -->
<!-- [![Stargazers][stars-shield]][stars-url] -->
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
<!-- [![LinkedIn][linkedin-shield]][linkedin-url] -->


<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/shubhroshekhar/pm2-telegram-notification">
    <img src="images/logo.png" alt="pm2-telegram-notification" width="348" height="79">
  </a>

  <h1 align="center">pm2-telegram-notification</h1>

  <p align="center">
    An awesome tool to integrate pm2 notifications to your telegram chats!
    <!-- <br /> -->
    <!-- <a href="https://github.com/shubhroshekhar/pm2-telegram-notification"><strong>Explore the docs »</strong></a> -->
    <br />
    <br />
    <!-- <a href="https://github.com/shubhroshekhar/pm2-telegram-notification">View Demo</a>
    · -->
    <a href="https://github.com/shubhroshekhar/pm2-telegram-notification/issues">Report Bug</a>
    ·
    <a href="https://github.com/shubhroshekhar/pm2-telegram-notification/issues">Request Feature</a>
  </p>
</p>

## What is pm2-telegram-notification ?
Send server logs to a telegram group/chat.
works with pm2 process manager.


## Installation
`pm2 install pm2-telegram-notification`

## How to Use
### Telegram setup 
* create a telegram bot [link](https://core.telegram.org/bots#creating-a-new-bot)
* add that bot to a group if you want to send logs to a group
* get chat_id
    - to get chat_id use `https://api.telegram.org/bot<BOT_TOKEN>/getUpdates` api

### pm2-telegram-notification setup
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

##### Configuration definition 😎

* `server_name` = name of the server   
* `bot_token` = token generated with telegram as suggested in '_Telegram setup section_'
* `chat_id` = identifier corresponding to particular group or personal chat on which the notifications are expected to be posted, as explained in '_Telegram setup section_'
* `lifecycle` =  enabled alerts for lifecycle event handlers exposed by pm2, default is **true**
* `error` = enabled alerts for error handlers exposed by pm2, default is **true**
* `error_log` = flag configuration to truncate log with ref-id above 3500 characters with a trace in logs annotated with that ref-id, default is **true**
* `violation_time` = time interval gap in which if another alerts occurs is said to count as violation, default is **10000**
* `violation_count` = violation count limit after which the notification is delayed with debounce time, default is **8**
* `debounce` = delay/debounce time applied in milliseconds to notification in case if violation count limit is reached, default is **30000**



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/shubhroshekhar/pm2-telegram-notification.svg?style=flat-square
[contributors-url]: https://github.com/shubhroshekhar/pm2-telegram-notification/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/shubhroshekhar/pm2-telegram-notification.svg?style=flat-square
[forks-url]: https://github.com/shubhroshekhar/pm2-telegram-notification/network/members
[stars-shield]: https://img.shields.io/github/stars/shubhroshekhar/pm2-telegram-notification.svg?style=flat-square
[stars-url]: https://github.com/shubhroshekhar/pm2-telegram-notification/stargazers
[issues-shield]: https://img.shields.io/github/issues/shubhroshekhar/pm2-telegram-notification.svg?style=flat-square
[issues-url]: https://github.com/shubhroshekhar/pm2-telegram-notification/issues
[license-shield]: https://img.shields.io/github/license/shubhroshekhar/pm2-telegram-notification.svg?style=flat-square
[license-url]: https://github.com/shubhroshekhar/pm2-telegram-notification/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png