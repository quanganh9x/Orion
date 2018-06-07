const phim = require('./phim');
const nhac = require('./nhac');

module.exports = function (bot) {
    bot.hear(['search'], (payload, chat) => {
        chat.conversation((convo) => {
            const presearchbot = (convo) => {
                convo.say({
                    text: "[SearchBOT] v2.0 xin chào mừng!",
                    buttons: [
                        {type: 'postback', title: 'Phim', payload: 'SB_PHIM'},
                        {type: 'postback', title: 'Nhạc', payload: 'SB_NHAC'},
                    ]
                }).then(() => searchbot(convo));
            };
            const searchbot = (convo) => {
                convo.ask(() => {}, (payload, convo) => {
                    switch (payload.message.text) {
                        case 'Phim':
                            convo.ask("Bạn muốn tìm phim gì ?", (payload, convo) => {
                                phim(payload.message.text, convo, searchbot);
                            });
                            break;
                        case 'Nhạc':
                            convo.ask("Bạn muốn tìm nhạc gì ?", (payload, convo) => {
                                nhac(payload.message.text, convo, searchbot);
                            });
                            break;
                        case 'whereami':
                        case 'Whereami':
                        case 'Wai':
                            convo.say("Main > SearchBOT");
                            searchbot(convo);
                            break;
                        case 'end':
                        case 'End':
                            convo.end();
                            break;
                        default:
                            convo.say("Không có tuỳ chọn này :( Ý bạn là \'phim\' hoặc \'nhạc\' ?");
                            presearchbot(convo);
                            break;
                    }
                });
            };
            presearchbot(convo);
        });
    });
};