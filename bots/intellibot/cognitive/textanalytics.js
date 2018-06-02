<<<<<<< HEAD

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




=======
const cognitiveServices = require('cognitive-services');
const face = new cognitiveServices.textAnalytics({
    apiKey: "1c0c07e444a3447ba57a600fecd5633b",
    endpoint: "westcentralus.api.cognitive.microsoft.com"
});
>>>>>>> parent of bdf5a4d... huhu
