module.exports = (id1, id2, bot) => {
    bot.conversation(id1, (convo1) => {
        const writeStream = (convo1) => {
            convo1.ask(() => {}, (payload, convo1) => {
                switch (payload.message.text) {
                    case 'end':
                        convo1.say("Exiting...").then(() => {
                            bot.say(id2, "Người chat" + id1 + "đã thoát phòng").then(() => {
                                convo1.end();
                            });
                        });
                        break;
                    default:
                        bot.say(id2, payload.message.text).then(() => {
                            writeStream(convo1);
                        });
                        break;
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
        console.log("proc2 started");
        const writeStream = (convo2) => {
            convo2.ask(() => {
            }, (payload, convo2) => {
                console.log(payload.message.text);
                switch (payload.message.text) {
                    case 'end':
                        convo2.say("Exiting...").then(() => {
                            bot.say(id1, "Người chat" + id2 + "đã thoát phòng").then(() => {
                                convo2.end();
                            });
                        });
                        break;
                    default:
                        bot.say(id1, payload.message.text).then(() => {
                            console.log("turn back");
                            writeStream(convo2);
                        });
                        break;
                }
            });
        };
        const intro = (convo2) => {
            convo2.say("[2] You\'re chatting with " + id1).then(() => {
                writeStream(convo2);
            });
        };
        intro(convo2);
    });
};