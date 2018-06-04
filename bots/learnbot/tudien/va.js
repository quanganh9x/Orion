const aa = require('./aa');
const Translate = require('@google-cloud/translate');
const translate = new Translate({
    key: process.env.GOOGLE_API_KEY
});

module.exports = (convo, learnbot) => {
    convo.ask("Nhập từ muốn dịch sang tiếng Anh ?", (payload, convo) => {
        translate
            .translate(payload.message.text, 'en')
            .then(results => {
                results = results[1];
                if (results.data.translations && results.data.translations[0].translatedText) {
                    let answer = results.data.translations[0].translatedText;
                    if (results.data.translations[1] && results.data.translations[1].translatedText) answer = answer + ", " + results.data.translations[1].translatedText;
                    convo.say("Có thể dịch thành: \'" + answer + "\'").then(() => {
                        if (!results.data.translations[0].translatedText.includes(' ')) aa(results.data.translations[0].translatedText, convo, learnbot);
                        else learnbot(convo);
                    });
                } else convo.say(":( Không dịch được").then(() => learnbot(convo));
            })
            .catch(err => {
                console.log(err);
                convo.say(":( Không dịch được").then(() => learnbot(convo));
            });
    });
};