const wolfram = require('wolfram-alpha').createClient("9WTJXY-KEKYY3AGXQ");
const Translate = require('@google-cloud/translate');
const translate = new Translate({
    key: process.env.GOOGLE_API_KEY
});

module.exports = (convo, learnbot) => {
    convo.ask("Nhập câu hỏi bạn muốn ?", (payload, convo) => {
        translate.translate(payload.message.text, 'en').then(results => {
            results = results[1];
            if (results.data.translations && results.data.translations[0].translatedText) {
                wolfram.query(results.data.translations[0].translatedText, function (err, result) {
                    if (err) {
                        console.log(err);
                        convo.say("???").then(() => {
                            learnbot(convo);
                        });
                    } else if (result && result[1].subpod.plaintext) {
                        translate.translate(result[1].subpod.plaintext[0], 'vi').then(response => {
                            (async () => {
                                const answer = await response.text;
                                convo.say("Trả lời: " + answer).then(() => {
                                    learnbot(convo);
                                });
                            })();
                        }).catch(err => {
                            console.log(err);
                            convo.say("???").then(() => learnbot(convo));
                        });
                    }
                });
            } else convo.say("???").then(() => learnbot(convo));
        }).catch(err => {
            console.log(err);
            convo.say("???").then(() => learnbot(convo));
        });
    });
};