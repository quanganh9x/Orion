
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
        responses.forEach(element => {
          console.log('element: ', JSON.stringify(element))
        });
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  });

}




