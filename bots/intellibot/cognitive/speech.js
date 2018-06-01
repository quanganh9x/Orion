const cognitiveServices = require('cognitive-services');
const face = new cognitiveServices.bingSpeech({
    apiKey: "624b863a2a0e4607ab16929c320c2333",
    endpoint: "api.cognitive.microsoft.com"
});