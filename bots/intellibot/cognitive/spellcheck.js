const cognitiveServices = require('cognitive-services');
const spellcheck = new cognitiveServices.bingSpellCheckV7({
    apiKey: "2ff21eaca8a94c1da719c24e54289d19",
    endpoint: "api.cognitive.microsoft.com"
});
const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();
module.exports = (convo, intellibot) => {
    convo.ask('', (payload, convo) => {
        // The text to analyze
        const text = payload.messege.text;
        const document = {
            content: text,
            type: 'PLAIN_TEXT',
        };
        // Detects the sentiment of the text
        client
            .analyzeSentiment({ document: document })
            .then(results => {
                const sentiment = results[0].documentSentiment;
                console.log(`Text: ${text}`);
                console.log(`Sentiment score: ${sentiment.score}`);
                console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
            })
            .catch(err => {
                console.error('ERROR:', err);
            });
    });

}

