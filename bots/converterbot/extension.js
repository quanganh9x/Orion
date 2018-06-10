const request = require('request');

module.exports = (convo, converterbot) => {
    convo.ask("Bạn muốn đổi từ định dạng file nào?", (payload, convo) => {
        convo.set("from", payload.message.text);
        convo.ask("Và sang định dạng ...? (chưa hỗ trợ đổi từ pdf sang doc, xlsx,...", (payload, convo) => {
            convo.set("to", payload.message.text);
            convo.ask("Bạn gửi URL file lên cho mình nhé ?", (payload, convo) => {
                const pattern = new RegExp('^(https?:\/\/)?'+ // protocol
                    '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
                    '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
                    '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
                    '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
                    '(\#[-a-z\d_]*)?$','i'); // fragment locater
                if (pattern.test(payload.message.text)) {
                    request.get({
                        url: 'https://v2.convertapi.com' + convo.get('from') + '/to/' + convo.get('to') + '?Secret='+ process.env.CONVERT_API_KEY +'&File=' + payload.message.text + '&StoreFile=true',
                        headers: {
                            'Accept': 'application/json'
                        }
                    }, (err, response, body) => {
                        if (body && body.Files) {
                            convo.say("Đã chuyển: " + body.Files[0].Url).then(() => converterbot(convo));
                        } else convo.say("Không chuyển được. Sai định dạng hoặc không hỗ trợ :(").then(() => converterbot(convo));
                    });

                } else convo.say(":( không phải URL").then(() => converterbot(convo));
            });
        });
    });
};