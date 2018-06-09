const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient({
    keyFilename: process.env.GOOGLE_AUTH_SERVICE
});
module.exports = (convo, intellibot) => {
    convo.ask('Nhập văn bản muốn được phân tích (chỉ hỗ trợ tiếng Anh) ?', (payload, convo) => {
        const text = payload.message.text;
        const document = {
            'content': text,
            'type': 'PLAIN_TEXT',
        };
        const features = {
            "extractEntities": true,
            "extractDocumentSentiments": true,
            "classifyText": true,
            "extractSyntax": false
        };
        const request = {
            'document': document,
            "features": features,
            "encodingType": "UTF8"
        };
        client
            .annotateText(request)
            .then(responses => {
                (async () => {
                    responses = await responses[0];
                    if (responses.entities) {
                        let keyWord = "Các từ khóa chính\n";
                        for (let i = 0; i < responses.entities.length; i++) {
                            keyWord += (i + 1) + ". " + responses.entities[i].name + "\n Độ ảnh hưởng: " + Math.ceil(responses.entities[i].salience*100) + "%\n";
                        }
                        convo.say(keyWord);
                    }
                    if (responses.categories) {
                        let topic = "";
                        for (let i = 0; i < responses.categories.length; i++) {
                            if (responses.categories[i].confidence > 0.4) {
                                topic += (i + 1) + responses.categories[i].name + "\n";
                            }
                        }
                        convo.say(topic);
                    }
                })();
            }).catch(err => {
                console.log(err);
                intellibot(convo);
        });
        client
            .analyzeSentiment(request)
            .then(responses => {
                (async () => {
                    responses = await responses[0];
                    const sentiment = await responses.documentSentiment;
                    await convo.say("Đánh giá bài viết (từ -1 đến 1): " + (sentiment.score > 0.25 ? "Tích cực" : sentiment.score > -0.25 ? "Trung lập" : "Tiêu cực"));
                    await convo.say("Cảm xúc (từ 0 -> ∞): " + sentiment.magnitude);
                })();

            })
            .catch(err => {
                console.error(err);
                intellibot(convo)
            });
    });
};




