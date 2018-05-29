import { Buffer } from 'buffer';

const crypto = require('./crypto');

module.exports = function (bot) {
    bot.hear(['crypto', 'mã hóa', 'code'], (payload, chat) => {
        chat.conversation((convo) => {
            convo.say("[Crypto&CodeBOT] v1.0 xin chào mừng!").then(() => {
                const cryptocodebot = (convo) => {
                    convo.ask(() => { }, (payload, convo) => {
                        (async () => {
                            switch (payload.message.text) {
                                case 'crypto':
                                    await convo.ask("Hãy gửi cái bạn muốn mã hóa", (payload, convo) => {
                                        var buf = new Buffer.from(payload.message.attachments);
                                        convo.ask("Key AES bạn muốn là gì (VD: AES123 => 123)", (payload, convo) => {
                                            convo.set("keyAES",payload.message.text);
                                            convo.ask("Key HMAC bạn muốn là gì (VD: HMAC-SHA1 => SHA1)", (payload, convo) => {
                                                convo.set("keyHMAC",payload.message.text);
                                            })
                                        })
                                        crypto(buf, keyAES , keyHMAC ,convo);
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