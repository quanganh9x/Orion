const weather = require('./weather');
const search = require('./search')

module.exports = function (bot) {
    bot.hear(['location'], (payload, chat) => {
        chat.conversation((convo) => {
            (async () => {
                await convo.say("[LocationBOT] v1.0 xin chào mừng");
                const locationbot = (convo) => {
                    convo.ask(() => {}, (payload, convo) => {
                        (async () => {
                            switch (payload.message.text) {
                                case 'thoi tiet':
                                    await weather(convo.get('lat'), convo.get('long'), convo, locationbot);
                                    break;
                                case 'dia diem':
                                    await search(convo.get('lat'), convo.get('long'), convo);
                                    break;
                                case 'doi':
                                    askLocation(convo);
                                    break;
                                case 'whereami':
                                    await convo.say("Main > LocationBOT");
                                    locationbot(convo);
                                    break;
                                case 'end':
                                    convo.end();
                                    break;
                                default:
                                    convo.say("Không có tuỳ chọn này :( Ý bạn là \\'thoi tiet\\' hoặc \\'dia diem\\' ?\"");
                                    locationbot(convo);
                                    break;
                            }
                        })();
                    })
                };
                const askLocation = (convo) => {
                    convo.ask({
                        text: "Bạn ở đâu thế - gửi vị trí lên để mình xử lý nhen ?",
                        quickReplies: [{
                            content_type: "location"
                        }]
                    }, (payload, convo) => {
                        if (payload.message.attachments[0].payload.coordinates) {
                            convo.set('lat', payload.message.attachments[0].payload.coordinates.lat);
                            convo.set('long', payload.message.attachments[0].payload.coordinates.long);
                            convo.say("Thành công!");
                            locationbot(convo);
                        } else {
                            convo.say(":( Mình chưa tìm được vị trí rồi");
                            convo.end();
                        }
                    });
                };
                askLocation(convo);
            })();
        });
    });
};
