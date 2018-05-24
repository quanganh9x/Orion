module.exports = (id1, id2, convo, bot) => {
    bot.conversation(id1, (convo) => {
        console.log("proc1 started");
        const writeStream = (convo) => {
            convo.ask(() => {
            }, (payload, convo) => {
                console.log(payload.message.text);
                switch (payload.message.text) {
                    case 'end':
                        convo.say("Im out").then(() => {
                            convo.end();
                        });
                        break;
                    default:
                        bot.say(id2, payload.message.text).then(() => {
                            console.log("turn back");
                            writeStream(convo);
                        });
                        break;
                }
            });
        };
        const intro = (convo) => {
            convo.say("[1] You\'re chatting with " + id2).then(() => {
                writeStream(convo);
            });
        };
        intro(convo);
    });
    bot.conversation(id2, (convo) => {
        console.log("proc2 started");
        const writeStream = (convo) => {
            convo.ask(() => {
            }, (payload, convo) => {
                console.log(payload.message.text);
                switch (payload.message.text) {
                    case 'end':
                        convo.say("Im out").then(() => {
                            convo.end();
                        });
                        break;
                    default:
                        bot.say(id1, payload.message.text).then(() => {
                            console.log("turn back");
                            writeStream(convo);
                        });
                        break;
                }
            });
        };
        const intro = (convo) => {
            convo.say("[2] You\'re chatting with " + id1).then(() => {
                writeStream(convo);
            });
        };
        intro(convo);
    });
};