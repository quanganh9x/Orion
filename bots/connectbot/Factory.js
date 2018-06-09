const User = require('../../models/user');

module.exports = (id1, id2, bot, convo) => {
    bot.conversation(id1, (convo1) => {
        const writeStream = (convo1) => {
            convo1.ask(() => {}, (payload, convo1) => {
                if (payload.message.attachment || !payload.message.text) convo1.say("Gửi att không được hỗ trợ!");
                else {
                    switch (payload.message.text) {
                        case 'end':
                            convo1.say("Exiting...").then(() => {
                                bot.say(id2, "Người chat " + id1 + " đã thoát phòng").then(() => {
                                    User.findOneAndUpdate({id: id1}, {$set: {roomId: null}}, {"new": true}, (err, result) => {
                                        if (err || !result) console.log("err " + err);
                                    });
                                    convo1.end();
                                });
                            });
                            break;
                        default:
                            bot.say(id2, payload.message.text);
                            writeStream(convo1);
                            break;
                    }
                }
            });
        };
        const intro = (convo1) => {
            convo1.say("[1] Bạn bắt đầu chat với UID: " + id2).then(() => {
                writeStream(convo1);
            });
        };
        intro(convo1);
    });
    bot.conversation(id2, (convo2) => {
        const writeStream = (convo2) => {
            convo2.ask(() => {
            }, (payload, convo2) => {
                if (payload.message.attachment || !payload.message.text) convo1.say("Gửi att không được hỗ trợ!");
                else {
                    switch (payload.message.text) {
                        case 'end':
                            convo2.say("Exiting...").then(() => {
                                bot.say(id1, "Người chat " + id2 + " đã thoát phòng").then(() => {
                                    User.findOneAndUpdate({id: id2}, {$set: {roomId: null}}, {"new": true}, (err, result) => {
                                        if (err || !result) console.log("err " + err);
                                    });
                                    convo2.end();
                                });
                            });
                            break;
                        default:
                            bot.say(id1, payload.message.text);
                            writeStream(convo2);
                            break;
                    }
                }
            });
        };
        const intro = (convo2) => {
            convo2.say("[2] Bạn bắt đầu chat với UID: " + id1).then(() => {
                writeStream(convo2);
            });
        };
        intro(convo2);
    });
    convo.end();
};