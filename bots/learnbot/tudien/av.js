const Translate = require('@google-cloud/translate');
const translate = new Translate({
    key: process.env.GOOGLE_API_KEY
});

module.exports = (convo, learnbot) => {
    convo.ask("Nhập từ / đoạn muốn dịch sang tiếng Việt ?", (payload, convo) => {
        translate
            .translate(payload.message.text, 'vi')
            .then(results => {
                results = results[1];
                if (results.data.translations.length !== 0) {
                    let answer = "Có thể dịch thành: ";
                    for (let i = 0; i < results.data.translations.length; i++) {
                        answer += results.data.translations[i].translatedText + ", ";
                        if (i === results.data.translations.length - 1) convo.say(answer).then(() => learnbot(convo));
                    }
                } else convo.say(":( Không dịch được").then(() => learnbot(convo));
            })
            .catch(err => {
                console.log(err);
                convo.say(":( Không dịch được").then(() => learnbot(convo));
            });
    });
};