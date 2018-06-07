module.exports = (bot) => {
    bot.hear('help', (payload, chat) => {
        chat.say("Các lệnh đang được hỗ trợ: learn/crypto/location/search/connect/converter/intelli/news/security");
    });
    bot.hear('whereami', (payload, chat) => {
        chat.say("Main");
    });
    bot.hear('learn/crypto/location/search/connect/converter/intelli/news/security', (payload, chat) => {
        chat.say("Dùng từng lệnh 1 thôi. Tham vậy @@");
    })
};