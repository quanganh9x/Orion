const vnexpress = require('./vnexpress');
const tinmoi = require('./tinmoi');

module.exports = function (bot) {
    bot.hear(['tin tức', 'đọc báo', 'tin mới', 'news'], (payload, chat) => {
            vnexpress(chat);
            tinmoi(chat);
    });
};