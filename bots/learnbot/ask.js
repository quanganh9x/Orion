const request = require('request');
const Translate = require('@google-cloud/translate');
const translate = new Translate({
    key: process.env.GOOGLE_API_KEY
});

module.exports = (convo, learnbot) => {
    convo.ask("Nhập câu hỏi bạn muốn ?", (payload, convo) => {
        translate.translate(payload.message.text, 'en').then(results => {
            results = results[1];
            if (results.data.translations && results.data.translations[0].translatedText) {
                request("http://api.wolframalpha.com/v2/query?appid="+process.env.WOLFRAM_API_KEY+"&input="+encodeURIComponent(results.data.translations[0].translatedText)+"&output=json&podindex=2", (err, response, body) => {
                    if (err || response.statusCode !== 200) {
                        console.log(err);
                        convo.say("???").then(() => learnbot(convo));
                    } else {
                        body = JSON.parse(body);
                        if (body && body.queryresult.pods.length === 1 && body.queryresult.pods[0].title === "Result" && body.queryresult.pods[0].subpods.length === 1) {
                            translate.translate(body.queryresult.pods[0].subpods[0].plaintext, 'vi').then(response => {
                                (async () => {
                                    response = response[1];
                                    const answer = await response.data.translations[0].translatedText;
                                    convo.say("Trả lời: " + answer).then(() => learnbot(convo));
                                })();
                            }).catch(err => {
                                console.log(err);
                                convo.say("???").then(() => learnbot(convo));
                            });
                        } else convo.say("???").then(() => learnbot(convo));
                    }
                });
            } else convo.say("???").then(() => learnbot(convo));
        }).catch(err => {
            console.log(err);
            convo.say("???").then(() => learnbot(convo));
        });
    });
};