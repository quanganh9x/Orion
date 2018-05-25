const phim = require('./phim');
const nhac = require('./nhac');

module.exports = function (bot) {
  bot.hear(['search'], (payload, chat) => {
      chat.conversation((convo) => {
            convo.say("[SearchBOT] v2.0 xin chào mừng!").then(() => {
                const searchbot = (convo) => {
                    convo.ask(() => {}, (payload, convo) => {
                        (async () => {
                            switch (payload.message.text) {
                                case 'phim':
                                    await convo.ask("Bạn muốn tìm phim gì ?", (payload, convo) => {
                                        phim(payload.message.text, convo);
                                    });
                                    break;
                                case 'nhạc':
                                    await convo.ask("Bạn muốn tìm nhạc gì ?", (payload, convo) => {
                                        nhac(payload.message.text, convo);
                                    });
                                    break;
                                case 'whereami':
                                    await convo.say("Main > SearchBOT");
                                    break;
                                case 'end':
                                    convo.end();
                                    break;
                                default:
                                    await convo.say("Không có tuỳ chọn này :( Ý bạn là \'phim\' hoặc \'nhạc\' ?");
                                    break;
                            }
                            searchbot(convo);
                        })();
                    });
                };
                searchbot(convo);
            });
      });
  });
};