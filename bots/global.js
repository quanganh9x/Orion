const config = require('./config');
///// bots modules /////
let helloBot = require('./hellobot/index');
<<<<<<< HEAD
//let locationBot = require('./locationbot/index');
=======
let searchBot = require('./searchbot/index');
let newsBot = require('./newsbot/index');
let locationBot = require('./locationbot/index');
>>>>>>> 0680f375dfc733e6e5c6c59f02078fdcf9475b40
///////////////////////

module.exports = function (bot) {
    bot.module(config);
    bot.module(helloBot);
<<<<<<< HEAD
    //locationBot(bots);
=======
    bot.module(searchBot);
    bot.module(newsBot);
    bot.module(locationBot);
>>>>>>> 0680f375dfc733e6e5c6c59f02078fdcf9475b40
};