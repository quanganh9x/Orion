const User = require('../models/user');

module.exports = function (bot) {
    bot.setGreetingText("Chào bạn. Tớ là một trợ lý đáng iuuuuu của @Đặng Anh và team <3");
    bot.setGetStartedButton((payload, chat) => {
        (async () => {
            await chat.say('Xin chào! Bây giờ là: ' + new Date(Date.now()).toLocaleString() + '. Xin chào mừng bạn đã đến với Project Orion!');
            await chat.say("Khi sử dụng, hãy nhớ rằng bạn đã đồng ý cung cấp thông tin cho chúng tôi. Hãy yên tâm, vì dữ liệu của bạn sẽ được bảo vệ và không được sử dụng / cung cấp trái phép cho bên thứ ba");
            await chat.say('Mọi hành động phá hoại / lợi dụng vào mục đích xấu sẽ dẫn đến việc huỷ bỏ quyền truy cập. Hãy cẩn thận!');
            chat.conversation((convo) => {
                (async () => {
                    await chat.getUserProfile().then((user) => {
                        convo.set('profile', user);
                    });
                    let userInfo = await convo.get('profile');
                    User.findOne({id: userInfo.id}, (err, result) => {
                        if (err) console.log("err data: " + err);
                        if (result) {
                            chat.say("Tài khoản đã đăng ký. Status: " + result.status === 2 ? "Member" : "Staff");
                        } else {
                            const askEmail = (convo) => {
                                convo.ask({
                                    text: "Ban chua dang ky thi phai. Hay nhap email",
                                    quickReplies: [{
                                        "content_type": "user_email"
                                    }]
                                }, (payload, convo) => {
                                    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(payload.message.text)) {
                                        userInfo['email'] = payload.message.text;
                                        askTel(convo);
                                    } else convo.say("Email khong hop le");
                                });
                            };
                            const askTel = (convo) => {
                                convo.ask({
                                    text: "Cam on ban! Gio hay cung cap cho chung toi so dien thoai",
                                    quickReplies: [{
                                        "content_type": "user_phone_number"
                                    }]
                                }, (payload, convo) => {
                                    if (/(09|01[2|6|8|9])+([0-9]{8})\b/g.test(payload.message.text)) userInfo['tel'] = payload.message.text;
                                    else convo.say("SDT khong hop le");
                                });
                            };
                            askEmail(convo);
                        }
                    });
                })();
            });
        })();
    });
    bot.hear([], (payload, chat) => {
        chat.say('Xin cảm ơn! Hãy chờ một lát để chúng tôi xử lý yêu cầu của bạn...').then(() => {
            chat.getUserProfile().then((user) => {
                user['email'] = payload.message.text;
                User.findOne({"uniqueId": user.id}, (err, result1) => {
                    if (err) console.log("err data: " + err);
                    if (result1) {
                        chat.say("Tài khoản đã đăng ký email!");
                        /*User.findOneAndUpdate({"uniqueId": user.id}, {"email": user.email}, {new: true, fields: "email"}, (err, result2) => {
                            if (err || !result2) console.log("error saving data: " + err);
                            else chat.say("Đổi email thành công!");
                        });*/
                    } else {
                        var newUser = new User(user);
                        newUser.save((err) => {
                            if (err) console.log("error saving data: " + err);
                            else chat.say("Thêm email thành công!");
                        });
                    }
                });
            });
        });
    });
    if (process.env.DEBUG) {
        bot.on('message', (payload, chat) => {
            chat.sendAction('mark_seen');
            console.log(payload);
            console.log(payload.message.nlp.entities);
            const text = payload.message.text;
            chat.getUserProfile().then((user) => {
                console.log(`[DEBUG] Người dùng ${user.first_name} vừa nhắn: ${text}`);
            });
        });
    }
};