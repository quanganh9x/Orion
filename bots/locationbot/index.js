const weather = require('./weather');

/////////////////////////////// Thời tiết bot ////////////////////////////
module.exports = function (bot) {
    bot.hear(['location'], (payload, chat) => {
        chat.conversation((convo) => {
            (async () => {
                await convo.say("[LocationBOT] v1.0 xin chào mừng");
                await convo.ask({
                    text: "Bạn ở đâu thế - gửi vị trí lên để mình xử lý nhen ?",
                    quickReplies: {
                        content_type: "location"
                    }
                }, (payload, convo) => {
                    if (payload.message.attachments[0].payload.coordinates) {
                        convo.set('lat', payload.message.attachments[0].payload.coordinates.lat);
                        convo.set('long', payload.message.attachments[0].payload.coordinates.long);
                        convo.say("Thành công!")
                    } else {
                        convo.say(":( Mình chưa tìm được vị trí rồi");
                        convo.end();
                    }
                });
                const locationbot = (convo) => {
                    convo.ask(() => {}, )
                }
            })();
        });
    });
};
