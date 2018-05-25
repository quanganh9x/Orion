const weather = require('./weather');

/////////////////////////////// Thời tiết bot ////////////////////////////
module.exports = function (bot) {
    bot.hear(['location'], (payload, chat) => {
        chat.conversation((convo) => {
            (async () => {
                await convo.say("[LocationBOT] v1.0 xin chào mừng");
                const askLocation = (convo) => {
                    convo.ask({
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
                };
                await askLocation(convo);
                const locationbot = (convo) => {
                    convo.ask(() => {}, (payload, convo) => {
                        (async () => {
                            switch (payload.message.text) {
                                case 'thoi tiet':
                                    await weather(convo.get('lat'), convo.get('long'), convo);
                                    break;
                                case 'dia diem':
                                    break;
                                case 'doi':
                                    await askLocation(convo);
                                    break;
                                case 'whereami':
                                    await convo.say("Main > LocationBOT");
                                    break;
                                case 'end':
                                    convo.end();
                                    break;
                                default:
                                    convo.say("Không có tuỳ chọn này :( Ý bạn là \\'thoi tiet\\' hoặc \\'dia diem\\' ?\"");
                                    break;
                            }
                            locationbot(convo);
                        })();
                    })
                };
                locationbot(convo);
            })();
        });
    });
};
