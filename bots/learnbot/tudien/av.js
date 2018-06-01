const googleTranslator = require('google-translator');
const Translate = require('@google-cloud/translate');
const projectId = process.env.API_KEY;
const translate = new Translate({
    projectId: projectId,
});

module.exports = (convo, learnbot) => {
    convo.ask("Nhập từ muốn tra ?", (payload, convo) => {
        translate
            .translate(payload.message.text, 'vi')
            .then(results => {
                if (results.data.translations.length != 0) {
                    let defs;
                    for (let i = 0; i < results.data.translations.length; i++) {
                        defs += "\'" + results.data.translations.length[i].translatedText + "\'\n";
                        if (i == response.source.target.synonyms.length - 1) {
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