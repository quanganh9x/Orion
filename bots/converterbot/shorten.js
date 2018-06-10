const BitlyClient = require('bitly');
const bitly = BitlyClient('f1bcfade07d92260a1f0a15932186a3110c50015');

module.exports = (convo, converterbot) => {
    convo.ask("Bạn muốn rut gon link nao ?", (payload, convo) => {
            bitly.shorten(payload.message.text)
                .then(function(result) {
                    console.log(result);
                    convo.say(result).then(() => converterbot(convo));
                })
                .catch(function(error) {
                    convo.say("Lỗi :(").then(() => converterbot(convo));
                });
    });
};