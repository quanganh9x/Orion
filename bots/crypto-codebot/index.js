const crypto = require('./crypto');

module.exports = function (bot) {
  bot.hear(['crypto','mã hóa','code'], (payload, chat) => {
      chat.conversation((convo) => {
            convo.say("[Crypto&CodeBOT] v1.0 xin chào mừng!").then(() => {
                const cryptocodebot = (convo) => {
                    convo.ask(() => {}, (payload, convo) => {
                        (async () => {
                            switch (payload.message.text) {
                                case 'crypto':
                                    await convo.ask("Hãy tải file lên", (payload, convo) => {
                                        phim(payload.message.text, convo);
                                    });
                                    break;
                                
                                default:
                                    await convo.say("Không có tuỳ chọn này :( Ý bạn là \'crypto\' hoặc ?");
                                    break;
                            }
                            cryptocodebot(convo);
                        })();
                    });
                };
                cryptocodebot(convo);
            });
      });
  });
};