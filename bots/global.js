const config = require('./config');
///// bot modules /////
let helloBot = require('./hellobot/index');
///////////////////////

module.exports = function (bot) {
    config(bot);
    helloBot(bot);
};