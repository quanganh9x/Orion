import { Buffer } from 'buffer';

const crypto = require('./crypto');
const qrBar = require('./qr-bar');
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
                                                    crypto.aes(buf, keyAES, convo);
                                                    break;
                                                default:
                                                    convo.say("Không có tuỳ chọn này :( Ý bạn là \'keyless\' hoặc \'hmac\' hoặc \'aes\'?");
                                                    break;
                                            }
                                        });
                                    });
                                    break;
                                case 'qr-bar code':
                                    await convo.ask("Hãy nhập lựa chọn của bạn: \n 1. Giải mã QR \n 2. Giải mã barcode \n 3. Tạo mã QR ", (payload, convo) => {
                                        convo.ask("Bạn muốn mã hóa kiểu nào (keyless / hmac / aes)?", (payload, convo) => {
                                            switch (payload.message.text) {
                                                case "1":
                                                    convo.ask("Hãy upload ảnh của bạn lên", (payload, convo) => {
                                                        if (payload.message.attachments[0].payload.type == "image") {
                                                            convo.set("img", payload.message.attachments[0].payload.url)
                                                        }
                                                    })
                                                    qrBar.qrReader(img, convo);

                                                    break;
                                                case "2":
                                                    convo.ask("Hãy upload ảnh của bạn lên", (payload, convo) => {
                                                        if (payload.message.attachments[0].payload.type == "image") {
                                                            convo.set("img", payload.message.attachments[0].payload.url)
                                                        }
                                                    })
                                                    qrBar.barReader(img, convo);
                                                    break;
                                                    break;
                                                case "3":
                                                    convo.ask("Hãy gửi dòng bạn muốn tạo mã QR ", (payload, convo) => {
                                                        convo.set("input", payload.message.text);
                                                    })
                                                    qrBar.codeWriter(input, convo);
                                                    break;
                                                default:
                                                    convo.say("Không có tuỳ chọn này :( Ý bạn là \'1\' hoặc \'2\' hoặc \'3\'?");
                                                    break;
                                            }
                                        });
                                    });
                                    break;
                                default:
                                    await convo.say("Không có tuỳ chọn này :( Ý bạn là \'crypto\' hoặc \'qr-bar code\' ?");
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