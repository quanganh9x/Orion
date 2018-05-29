import { Buffer } from 'buffer';

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
                                    await convo.ask("Bạn muốn mã hóa sang gì (sha1, sha224, sha256, sha384, sha512, md5, rmd160)", (payload, convo) => {
                                        convo.set("from",payload.message.text);
                                        convo.ask("Hãy gửi cái bạn muốn mã hóa", (payload, convo) => {                                                                                       
                                            var buf = new Buffer.from(payload.message.attachment.payload);
                                        })
                                        crypto(buf,from,convo);
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