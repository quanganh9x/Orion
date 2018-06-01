const cognitiveServices = require('cognitive-services');
const spellcheck = new cognitiveServices.bingSpellCheckV7({
    apiKey: "2ff21eaca8a94c1da719c24e54289d19",
    endpoint: "api.cognitive.microsoft.com"
});