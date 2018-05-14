const User = require('../models/user');

module.exports = function (bot) {
    bot.setGreetingText("Chào bạn. Tớ là một nô lệ đáng iuuuuu của @Đặng Anh và team");
    bot.setGetStartedButton((payload, chat) => {
        chat.say('Xin chào! Bây giờ là: ' + Date.now() + '. Chúc bạn buổi tối vui vẻ!');
        chat.say("Có vẻ bạn đang là người mới thì phải. Hãy nhập email để bắt đầu nhé!");
        chat.say("Khi sử dụng Project Orion, hãy nhớ rằng bạn đã đồng ý cung cấp thông tin cho chúng tôi. Hãy yên tâm, vì dữ liệu của bạn sẽ được bảo vệ và không được sử dụng / cung cấp trái phép cho bên thứ ba");
    });
    bot.hear([/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/], (payload, chat) => {
        chat.say('Xin cảm ơn! Hãy chờ một lát để chúng tôi xử lý yêu cầu của bạn...').then(() => {
            chat.getUserProfile().then(() => {
                User.findOne({"email": payload.message.text}, (err, user) => {
                    user.email = payload.message.text;
                    if (err) console.log("err data");
                    else if (user) {
                        User.findOneAndUpdate({"email": user.email}, user, {new: true}, (err, result) => {
                            if (err || !result) console.log("error saving data");
                            else chat.say("Đổi email thành công!");
                        })
                    } else {
                        var newUser = new User(user);
                        newUser.save((err) => {
                            if (err) console.log("error saving data");
                            else chat.say("Thêm email thành công!");
                        });
                    }
                });
            });
        });
    });
    if (process.env.DEBUG) {
        bot.on('message', (payload, chat) => {
            const text = payload.message.text;
            chat.getUserProfile().then((user) => {
                console.log(`[DEBUG] Người dùng ${user.first_name} vừa nhắn: ${text}`);
            });
        });
    }
};