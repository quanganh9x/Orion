// const cognitiveServices = require('cognitive-services');
// const spellcheck = new cognitiveServices.bingSpellCheckV7({
//     apiKey: "2ff21eaca8a94c1da719c24e54289d19",
//     endpoint: "api.cognitive.microsoft.com"
// });
const language = require('@google-cloud/language');
const API_KEY = process.env.API_GOOGLE;
const client = new language.LanguageServiceClient({
    keyFilename: API_KEY 
});
module.exports = (convo, intellibot) => {
    

}

