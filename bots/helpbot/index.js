module.exports = (bot) => {
    bot.hear('help', (payload, chat) => {
        (async () => {
            await chat.say("Các lệnh đang được hỗ trợ: learn/crypto/location/search/connect/converter/intelli/news/security/group");
            await chat.say({
                text: "learn: [LearnBOT] từ điển & hỏi đáp",
                buttons: [{type: 'postback', title: 'learn', payload: 'LearnBOT'}]
            });
            await chat.say({
                text: "crypto: [CryptoBOT] mã hoá và giải mã",
                buttons: [{type: 'postback', title: 'crypto', payload: 'BOT'}]
            });
            await chat.say({
                text: "converter: [ConverterBOT] chuyển đổi đơn vị và tính toán",
                buttons: [{type: 'postback', title: 'converter', payload: 'BOT'}]
            });
            await chat.say({
                text: "security: [SecBOT] luôn luôn bảo vệ bạn ",
                buttons: [{type: 'postback', title: 'security', payload: 'BOT'}]
            });
            await chat.say({
                text: "search: [SearchBOT] không cần tốn thời gian tìm kiếm ",
                buttons: [{type: 'postback', title: 'search', payload: 'BOT'}]
            });
            await chat.say({
                text: "news: [NewsBOT] tin tức tự động và chính xác ",
                buttons: [{type: 'postback', title: 'news', payload: 'BOT'}]
            });
            await chat.say({
                text: "location: [LocationBOT] thông tin trên từng cây số ",
                buttons: [{type: 'postback', title: 'location', payload: 'BOT'}]
            });
            await chat.say({
                text: "connect: [ConnectBOT] không để bạn phải ở một mình ",
                buttons: [{type: 'postback', title: 'connect', payload: 'BOT'}]
            });
            await chat.say({
                text: "intelli: [IntelliBOT] tự động hoá & nhận diện ",
                buttons: [{type: 'postback', title: 'intelli', payload: 'BOT'}]
            });
            await chat.say({
                text: "group: [GroupBOT] quản lý hội nhóm theo cách của bạn ",
                buttons: [{type: 'postback', title: 'group', payload: 'BOT'}]
            });
        })();
    });
    bot.hear(['whereami', 'wai'], (payload, chat) => {
        chat.say("Main");
    });
    bot.hear('end', (payload, chat) => {
        chat.say("Bạn đã thoát khỏi các bot rồi. Sử dụng một trong các lệnh để tiếp tục");
    });
    bot.hear('changelog', (payload, chat) => {
        (async () => {
            await chat.say(
                "--- 10/6/2018 ---\n" +
                "1. Cập nhật tính năng v3.0\n" +
                "2. Cập nhật hướng đối tượng\n" +
                "3. Release v2.0");
            await chat.say(
                "--- 29/5/2018 ---\n" +
                "1. Release v1.0\n" +
                "2. Hoàn thiện 5 tính năng chính"
            );
            await chat.say(
                "--- 10/5/2018 ---\n" +
                "1. Demo"
            )
        })();
    });
};