const crypto = require('./crypto');

module.exports = (convo, cryptobot) => {
    convo.ask("Chuỗi bạn muốn mã hóa ?", (payload, convo) => {
        convo.set("data", payload.message.text);
        convo.ask({
            text: "Bạn muốn mã hóa kiểu nào ?",
            quickReplies: ['normal', 'HMAC', 'AES']
        }, (payload, convo) => {
            switch (payload.message.text) {
                case "normal":
                    crypto.keyless(convo.get("data"), convo, cryptobot);
                    break;
                case "HMAC":
                    convo.ask("HMAC key ?", (payload, convo) => {
                        convo.set('key', payload.message.text);
                        convo.ask({
                            text: "Có sử dụng base64 ?",
                            quickReplies: ['Yep', 'Nah']
                        }, (payload, convo) => {
                            if (payload.message.text === "Yep") crypto.hmac(convo.get('data'), convo.get('key'), true, convo, cryptobot);
                            else crypto.hmac(convo.get('data'), convo.get('key'), false, convo, cryptobot);
                        });
                    });
                    break;
                case "AES":
                    convo.ask("AES key ?", (payload, convo) => {
                        crypto.aes(convo.get('data'), payload.message.text, convo, cryptobot);
                    });
                    break;
                default:
                    convo.say("Không có tuỳ chọn này :( Ý bạn là \'normal\' hoặc \'HMAC\' hoặc \'AES\'?");
                    cryptobot(convo);
                    break;
            }
        });
    });
};