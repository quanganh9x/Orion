const crypto = require('./crypto');
const encode = require('./encode');
const qrBar = require('./qr-bar');

module.exports = function (bot) {
    bot.hear(['crypto'], (payload, chat) => {
        chat.conversation((convo) => {
            const precryptobot = (convo) => {
                convo.say({
                    text: "[CryptoBOT] v1.0 xin chào mừng!",
                    quickReplies: ['Encode', 'QR & Barcode', 'Base64']
                }).then(() => cryptobot(convo));
            };
            const cryptobot = (convo) => {
                convo.ask(() => {}, (payload, convo) => {
                    switch (payload.message.text) {
                        case 'Encode':
                            encode(convo, cryptobot);
                            break;
                        case 'QR & Barcode':
                            convo.ask({
                                text: "Hãy lựa chọn:",
                                quickReplies: ['Encode QR', 'Decode QR', 'Barcode Reader']
                            }, (payload, convo) => {
                                switch (payload.message.text) {
                                    case "Decode QR":
                                        convo.ask("Hãy upload ảnh của bạn lên (1 ảnh)", (payload, convo) => {
                                            if (payload.message.attachments && payload.message.attachments[0].payload.type === "image") {
                                                qrBar.qrReader(payload.message.attachments[0].payload.url, convo, cryptobot);
                                            } else {
                                                convo.say("???");
                                                cryptobot(convo);
                                            }
                                        });
                                        break;
                                    case "Barcode Reader":
                                        convo.ask("Hãy upload ảnh barcode (1 ảnh) ?", (payload, convo) => {
                                            if (payload.message.attachments && payload.message.attachments[0].payload.type === "image") {
                                                qrBar.barReader(payload.message.attachments[0].payload.url, convo, cryptobot);
                                            } else {
                                                convo.say("???");
                                                cryptobot(convo);
                                            }
                                        });
                                        break;
                                    case "Encode QR":
                                        convo.ask("Nội dung QR code ?", (payload, convo) => {
                                            qrBar.codeWriter(payload.message.text, convo, cryptobot);
                                        });
                                        break;
                                    default:
                                        convo.say("Không có tuỳ chọn này :(");
                                        cryptobot(convo);
                                        break;
                                }

                            });
                            break;
                        case 'Base64':
                            convo.ask({
                                text: "Hãy lựa chọn:",
                                quickReplies: ['Mã hóa', 'Giải mã']
                            }, (payload, convo) => {
                                if (payload.message.text === "Giải mã") convo.set('type', 'decrypt');
                                else convo.set('type', 'encrypt');
                                convo.ask("Chuỗi muốn mã hóa / giải mã ?", (payload, convo) => {
                                    crypto.base64(payload.message.text, convo.get('type'), convo, cryptobot);
                                });
                            });
                            break;
                        default:
                            convo.say("Không có tuỳ chọn này :( Ý bạn là \'crypto\' hoặc \'qr-bar code\' ?");
                            cryptobot(convo);
                            break;
                    }
                });
            };
            precryptobot(convo);
        });
    });
};