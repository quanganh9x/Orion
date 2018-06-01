const weather = require('./weather');
const search = require('./search');

module.exports = function (bot) {
    bot.hear(['location'], (payload, chat) => {
        chat.conversation((convo) => {
            (async () => {
                await convo.say({
                    text: "[LocationBOT] v1.0 xin chào mừng",
                    quickReplies: ['Thời tiết', 'Thông tin về địa điểm']
                });
                const locationbot = (convo) => {
                    convo.ask(() => {}, (payload, convo) => {
                            switch (payload.message.text) {
                                case 'Thời tiết':
                                    weather(convo.get('lat'), convo.get('long'), convo, locationbot);
                                    break;
                                case 'Thông tin về địa điểm':
                                    convo.ask({
                                        text: "Lựa chọn kiểu tìm kiếm",
                                        buttons: [
                                            {type: 'postback', title: 'Địa điểm chỉ định', payload: 'SB_FIXED'},
                                            {type: 'postback', title: 'Địa điểm tùy chỉnh', payload: 'SB_CUSTOM'}
                                        ]
                                    }, (payload, convo) => {
                                        switch (payload.message.event) {
                                            case 'SB_FIXED':
                                                search.nearby(convo.get('lat'), convo.get('long'), convo, locationbot);
                                                break;
                                            case 'SB_CUSTOM':
                                                search.custom(convo.get('lat'), convo.get('long'), convo, locationbot);
                                                break;
                                        }
                                    });
                                    break;
                                case 'Đổi':
                                    askLocation(convo);
                                    break;
                                case 'whereami':
                                    convo.say("Main > LocationBOT");
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
