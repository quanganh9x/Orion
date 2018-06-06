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
                    const response = responses[0];
                    //entities
                    await convo.say("Các từ khóa chính");
                    let keyWord;
                    for (let i = 0; i < response.entities.length; i++) {
                        keyWord += (i + 1) + ". " + response.entities[i].name + "\n Độ ảnh hưởng " + response.entities[i].salience + "\n";
                    }
                    await convo.say(keyWord);
                    const sentiment = await responses[0].documentSentiment;
                    await convo.say("Đánh giá bài viết : " + (sentiment.score > 0.5 ? "Tích cực" : "Tiêu cực"));
                    await convo.say("Độ giàu cảm xúc (từ 1 -> vô hạn) : " + sentiment.magnitude);
                    let topic = "";
                    for (let i = 0; i < response.categories.length; i++) {
                        if (response.categories[i].confidence > 0.4) {
                            topic += (i + 1) + response.categories[i].name + "\n";
                        }
                    }
                    await convo.say("Chủ đề của bài\n" + topic).then(() => intellibot(convo));
                })();
            })
            .catch(err => {
                console.error(err);
                intellibot(convo)
            });
    });
};




