const googleTranslator = require('google-translator');

module.exports = (convo, learnbot) => {
    convo.ask("Nhập từ muốn tra ?", (payload, convo) => {
        googleTranslator('vi', 'en', payload.message.text, response => {
            convo.say("\'" + response.text + "\'").then(() => {
                if (response.source.target.synonyms.length != 0) {
                    let defs;
                    for (let i = 0; i < response.source.target.synonyms.length; i++) {
                        defs += "\'" + response.source.target.synonyms[i] + "\'\n";
                        if (i == response.source.target.synonyms.length - 1) {
                            convo.say("Có thể sử dụng: ").then(() => {
                                convo.say(defs).then(() => {
                                    learnbot(convo);
                                });
                            });
                        }
                    }
                }
            });
        });
    });
};