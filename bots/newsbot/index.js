const vnexpress = require('./vnexpress');
const tinmoi = require('./tinmoi');

module.exports = function (bot) {
    bot.on(['tin tức', 'đọc báo', 'tin mới', 'news'], (payload, chat) => {
    	const userId = payload.sender.id;
    	bot.say
            vnexpress(chat);
            tinmoi(chat);
    });
};