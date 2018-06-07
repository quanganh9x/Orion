const User = require('../models/user');

module.exports = function (bot) {
    bot.setGreetingText("Chào bạn. Mình là Orion - một trợ lý đắc lực cho cuộc sống của bạn!\n~~~ Project Orion by @quanganh9x và team ~~~");
    bot.setGetStartedButton((payload, chat) => {
        (async () => {
            await chat.say('Bây giờ là: ' + new Date(Date.now()).toLocaleString('vi-VN') + '. Xin chào mừng bạn đã đến với Project Orion!');
            await chat.say("Khi sử dụng, hãy nhớ rằng bạn đã đồng ý cung cấp thông tin cho chúng tôi. Hãy yên tâm, vì dữ liệu của bạn sẽ được bảo vệ và không được sử dụng / cung cấp trái phép cho bên thứ ba");
            await chat.say('Mọi hành động phá hoại / lợi dụng vào mục đích xấu sẽ dẫn đến việc huỷ bỏ quyền truy cập. Hãy cẩn thận!');
            await chat.say('Nếu bạn là người mới bắt đầu, hãy sử dụng lệnh \'help\'');
            chat.conversation((convo) => {
                (async () => {
                    await chat.getUserProfile().then((user) => {
                        convo.set('profile', user);
                    });
                    let userInfo = await convo.get('profile');
                    User.findOne({id: userInfo.id}, (err, result) => {
                        if (err) {
                            console.log("err data: " + err);
                            convo.end();
                        }
                        if (result) {
                            chat.say("Tài khoản đã đăng ký. Quyền truy cập: " + (result.privilege === 2 ? "Member" : "Staff")).then(() => {
                                convo.end();
                            });
                        } else {
                                const askTel = (convo) => {
                                    convo.ask({
                                        text: "Cám ơn bạn. Giờ hãy cung cấp cho chúng tôi số ĐT :)",
                                        quickReplies: [{
                                            "content_type": "user_phone_number"
                                        }]
                                    }, (payload, convo) => {
                                        if (payload.message.text.includes('+84')) payload.message.text.replace('+84','0');
                                        if (/(09|01[2|6|8|9])+([0-9]{8})\b/g.test(payload.message.text)) {
                                            (async () => {
                                                userInfo['tel'] = await payload.message.text;
                                                await new User(userInfo).save((err) => {
                                                    if (err) {
                                                        console.log("err saving data: " + err);
                                                        convo.say("Có lỗi trong quá trình đăng ký. Có thể là do trùng email / SĐT. Xóa đoạn chat và bắt đầu lại");
                                                        convo.end();
                                                    }
                                                    else convo.say("Thành công!");
                                                });
                                                convo.end();
                                            })();
                                        }
                                        else {
                                            convo.say("Số ĐT không hợp lệ").then(() => askTel(convo));
                                        }
                                    });
                                };
                                const askEmail = (convo) => {
                                    convo.ask({
                                        text: "Bạn chưa đăng ký thì phải ~~ Hãy bắt đầu với email nha",
                                        quickReplies: [{
                                            "content_type": "user_email"
                                        }]
                                    }, (payload, convo) => {
                                        if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(payload.message.text)) {
                                            userInfo['email'] = payload.message.text;
                                            askTel(convo);
                                        } else {
                                            convo.say("Email không hợp lệ").then(() => askEmail(convo));
                                        }
                                    });
                                };
                                askEmail(convo);
                        }
                    });
                })();
            });
        })();
    });

    if (process.env.DEBUG) {
        bot.on('message', (payload, chat) => {
            let text = payload.message.text;
            chat.getUserProfile().then((user) => {
                console.log(`[DEBUG] Người dùng ${user.first_name} vừa nhắn: ${text}`);
            });
        });
    }
};