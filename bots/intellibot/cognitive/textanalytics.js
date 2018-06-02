
const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient({
  keyFilename: './auth.json'
});
module.exports = (convo, intellibot) => {
  convo.ask('', (payload, convo) => {
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
    var request = {
      'document': document,
      "features": features,
      "encodingType": "UTF8"
    };
    client
      .annotateText(request)
      .then(responses => {
        var response = responses[0];
        //entities
        convo.say("Các từ khóa chính");
        var keyWord;
        for (var i = 0; i < response.entities.length; i++) {
          keyWord += (i + 1) + ". " + response.entities[i].name + "\n Độ ảnh hưởng " + response.entities[i].salience + "\n";

        }
        convo.say(keyWord);
        //sentiment
        const sentiment = responses[0].documentSentiment;
        var value;
        if (sentiment.score > 0.2) {
          value = 'Tích cực'
        } else {
          value = 'Tiêu cực'
        }
        convo.say("Đánh giá bài viết : " + value);
        convo.say("Độ giàu cảm xúc : " + sentiment.magnitude)
        //categories
        var topic;
        for (var i = 0; i < response.categories.length; i++) {
          if (response.categories[i].confidence > 0.4) {
            topic += (i + 1) + response.categories[i].name + "\n";
          }
        }
        convo.say("Chú đề của bài \n" + topic);

      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  });

}




