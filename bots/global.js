const config = require('./config');
///// bots modules /////
let helloBot = require('./hellobot/index');
let searchBot = require('./searchbot/index');
let newsBot = require('./newsbot/index');
let locationBot = require('./locationbot/index');
///////////////////////

module.exports = function (bot) {
    bot.module(config);
    bot.module(helloBot);
    bot.module(searchBot);
    bot.module(newsBot);
    bot.module(locationBot);
};