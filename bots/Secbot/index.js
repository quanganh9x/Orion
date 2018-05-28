var email_track = require('./emailTrack');


module.exports = function (bot) {
    bot.on(['bảo mật email','email của tôi'], (payload, chat) => {
    	const userId = payload.sender.id;
    	bot.say
            emailTrack(chat);
    });
};