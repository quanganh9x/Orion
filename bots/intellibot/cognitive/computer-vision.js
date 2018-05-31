const cognitiveServices = require('cognitive-services');
const face = new cognitiveServices.computerVision({
    apiKey: "c7596b44a7534bf38b57f602a8277a33",
    endpoint: "westcentralus.api.cognitive.microsoft.com"
});

module.exports = (convo, intellibot) => {
};