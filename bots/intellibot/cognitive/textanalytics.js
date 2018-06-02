
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
    var request = {
      'document': document,
      "encodingType": "UTF8"
    };
    client
      .analyzeSentiment(request)
      .then(responses => {
        const sentiment = responses[0].documentSentiment;
        var value;
        if (sentiment.score > 0.2) {
          value = 'Tích cực'
        } else {
          value = 'Tiêu cực'
        }
        convo.say("Đánh giá bài viết : " + value);
        convo.say("Điểm magnitude" + sentiment.magnitude)

      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  });

}




