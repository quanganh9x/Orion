const config = require('./config');
///// bots modules /////
let helloBot = require('./hellobot/index');
//let locationBot = require('./locationbot/index');
let searchBot = require('./searchbot/index');
///////////////////////

module.exports = function (bot) {
    bot.module(config);
    bot.module(helloBot);
    //locationBot(bots);
    bot.module(searchBot);
};