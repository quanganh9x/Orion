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
                    responses = responses[0];
                    if (responses.entities) {
                        await convo.say("Các từ khóa chính\n");
                        let keyWord;
                        for (let i = 0; i < responses.entities.length; i++) {
                            keyWord += (i + 1) + ". " + responses.entities[i].name + "\n Độ ảnh hưởng: " + Math.ceil(responses.entities[i].salience*100) + "%\n";
                        }
                        convo.say(keyWord);
                    }
                    if (responses.categories) {
                        let topic = "";
                        for (let i = 0; i < response.categories.length; i++) {
                            if (response.categories[i].confidence > 0.4) {
                                topic += (i + 1) + response.categories[i].name + "\n";
                            }
                        }
                        convo.say(topic);
                    }
                })();
            });
        client
            .analyzeSentiment(request)
            .then(responses => {
                (async () => {
                    const sentiment = await responses.documentSentiment;
                    await convo.say("Đánh giá bài viết : " + (sentiment.score > 0.25 ? "Tích cực" : sentiment.score > -0.25 ? "Trung lập" : "Tiêu cực"));
                    await convo.say("Cảm xúc: " + sentiment.magnitude);
                })();

            })
            .catch(err => {
                console.error(err);
                intellibot(convo)
            });
    });
};




