const config = require('./config');
///// bots swarm ///////
let helloBot = require('./hellobot/index');
let searchBot = require('./searchbot/index');
let newsBot = require('./newsbot/index');
let locationBot = require('./locationbot/index');
let connectBot = require('./connectbot/index');
let learnBot = require('./learnbot/index');
let intelliBot = require('./intellibot/index');
let secBot = require('./secbot/index');
let converterBot = require('./converterbot/index');
let cryptoBot = require('./cryptobot/index');
let helpBot = require('./helpbot/index');
////////////////////////

module.exports = (bot) => {
    bot.module(config);
    bot.module(helpBot);
    bot.module(helloBot);
    bot.module(searchBot);
    bot.module(newsBot);
    bot.module(locationBot);
    bot.module(connectBot);
    bot.module(learnBot);
    bot.module(intelliBot);
    bot.module(secBot);
    bot.module(converterBot);
    bot.module(cryptoBot);
};