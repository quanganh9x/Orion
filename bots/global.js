const config = require('./config');
///// bots swarm///////
let helloBot = require('./hellobot/index');
let searchBot = require('./searchbot/index');
let newsBot = require('./newsbot/index');
let locationBot = require('./locationbot/index');
let connectBot = require('./connectbot/index.js');
let learnBot = require('./connectbot/index.js');
let intelliBot = require('./connectbot/index.js');
let secBot = require('./secbot/index.js');
let converterBot = require('./converterbot/index.js');
let cryptoBot = require('./cryptobot/index.js');
///////////////////////

module.exports = (bot) => {
    bot.module(config);
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