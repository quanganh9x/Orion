const vnexpress = require('./vnexpress');

module.exports = function (bot) {
    bot.hear(['tin tức', 'đọc báo', 'tin mới'], (payload, chat) => {
            vnexpress(chat);
    });
};