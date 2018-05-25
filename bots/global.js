const config = require('./config');
///// bots modules /////
let helloBot = require('./hellobot/index');
let searchBot = require('./searchbot/index');
let newsBot = require('./newsbot/index');
let locationBot = require('./locationbot/index');
let connectBot = require('./connectbot/index.js');
///////////////////////

module.exports = function (bot) {
    bot.module(config);
    bot.module(helloBot);
    bot.module(searchBot);
    bot.module(newsBot);
    bot.module(locationBot);
    bot.module(connectBot);
};