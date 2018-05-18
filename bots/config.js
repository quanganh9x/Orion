module.exports = function (bot) {
    bot.setGreetingText("Chào bạn. Tớ là một nô lệ đáng iuuuuu của @Đặng Anh và team");
    bot.setGetStartedButton((payload, chat) => {
        chat.say('Xin chào! Bây giờ là: '+ Date.now() + '. Chúc bạn buổi tối vui vẻ!');
        chat.say("Có vẻ bạn đang là người mới thì phải. Sử dụng câu lệnh 'hello' để bắt đầu nhé!");
        chat.say("Khi chạy lênh 'hello', hãy nhớ rằng bạn đồng ý cung cấp thông tin cho chúng tôi. Hãy yên tâm, vì dữ liệu của bạn sẽ được bảo vệ và không được sử dụng / cung cấp trái phép");
    });
    bot.on('message', (payload, chat) => {
        const text = payload.message.text;
        chat.getUserProfile().then((user) => {
            console.log(`[DEBUG] Người dùng ${user.first_name} vừa nhắn: ${text}`);
        });
    });
};