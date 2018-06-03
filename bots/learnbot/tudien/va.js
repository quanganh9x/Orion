const Translate = require('@google-cloud/translate');
const translate = new Translate({
    key: process.env.GOOGLE_API_KEY
});

module.exports = (convo, learnbot) => {
    convo.ask("Nhập từ muốn dịch sang tiếng Anh ?", (payload, convo) => {
        translate
            .translate(payload.message.text, 'en')
            .then(results => {
                if (results.data.translations.length !== 0) {
                    let answer = "Có thể dịch thành: \n";
                    for (let i = 0; i < results.data.translations.length; i++) {
                        answer += "\'" + results.data.translations[i].translatedText + "\'\n";
                        if (i === results.data.translations.length - 1) {
                            convo.say(answer).then(() => learnbot(convo));
                        }
                    }
                } else convo.say(":( Không dịch được").then(() => learnbot(convo));
            })
            .catch(err => {
                console.log(err);
                convo.say(":( Không dịch được").then(() => learnbot(convo));
            });
    });
};