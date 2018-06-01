const Translate = require('@google-cloud/translate');
const translate = new Translate({
    key: process.env.GOOGLE_API_KEY
});

module.exports = (convo, learnbot) => {
    convo.ask("Nhập từ muốn dịch sang tiếng việt ?", (payload, convo) => {
        translate
            .translate(payload.message.text, 'vi')
            .then(results => {
                if (results.data.translations.length != 0) {
                    let defs;
                    for (let i = 0; i < results.data.translations.length; i++) {
                        defs += "\'" + results.data.translations[i].translatedText + "\'\n";
                        if (i === results.data.translations.length - 1) {
                            convo.say("Có thể sử dụng: ").then(() => {
                                convo.say(defs).then(() => {
                                    learnbot(convo);
                                });
                            });
                        }
                    }
                }
            })
            .catch(err => {
                console.log(err);
                convo.say(":( Không dịch được").then(() => {
                    learnbot(convo);
                });
            });
    });
};