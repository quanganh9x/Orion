const BitlyClient = require('bitly');
const bitly = BitlyClient('f1bcfade07d92260a1f0a15932186a3110c50015');

module.exports = (convo, converterbot) => {
    convo.ask("Bạn muốn rut gon link nao ?", (payload, convo) => {
        const pattern = new RegExp('^(https?:\/\/)?'+ // protocol
            '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
            '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
            '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
            '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
            '(\#[-a-z\d_]*)?$','i'); // fragment locater
        if (pattern.test(payload.message.text)) {
            bitly.shorten(payload.message.text)
                .then(function(result) {
                    convo.say(result).then(() => converterbot(convo));
                })
                .catch(function(error) {
                    convo.say("Lỗi :(").then(() => converterbot(convo));
                });
        }
    });
};