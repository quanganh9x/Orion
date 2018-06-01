const googleTranslator = require('google-translator');
const Translate = require('@google-cloud/translate');
const API_KEY = process.env.API_KEY;
const translate = new Translate({
    key: API_KEY
});

module.exports = (convo, learnbot) => {
    convo.ask("Nhập từ muốn tra ?", (payload, convo) => {
        translate
            .translate(payload.message.text, 'en')
            .then(results => {
                if (results.data.translations.length != 0) {
                    let defs;
                    for (let i = 0; i < results.data.translations.length; i++) {
                        defs += "\'" + results.data.translations[i].translatedText + "\'\n";
                        if (i == results.data.translations.length - 1) {
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
                console.error('ERROR:', err);
            });
    });
};