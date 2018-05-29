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
                                        convo.set("keyAES", payload.message.text);
                                        var buf = new Buffer.from(payload.message.attachments);
                                        convo.ask("Bạn muốn mã hóa kiểu nào (keyless / hmac / aes)?", (payload, convo) => {
                                            switch (payload.message.text) {
                                                case "keyless":
                                                    crypto.keyless(buf, convo);
                                                    break;
                                                case "hmac":
                                                    convo.ask("Key HMAC bạn muốn là gì ?", (payload, convo) => {
                                                        convo.set("keyHMAC", payload.message.text);
                                                    })
                                                    crypto.hmac(buf, keyHMAC, convo);
                                                    break;
                                                case "aes":
                                                    convo.ask("Key AES bạn muốn là gì ?", (payload, convo) => {
                                                        convo.set("keyAES", payload.message.text);
                                                    })
                                                    crypto.arguments(buf, keyAES, convo);
                                                    break;
                                                default:
                                                    convo.say("Không có tuỳ chọn này :( Ý bạn là \'keyless\' hoặc \'hmac\' hoặc \'aes\'?");
                                                    break;
                                            }
                                        });
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