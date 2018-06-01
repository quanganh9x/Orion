const cognitiveServices = require('cognitive-services');
const face = new cognitiveServices.textAnalytics({
    apiKey: "1c0c07e444a3447ba57a600fecd5633b",
    endpoint: "westcentralus.api.cognitive.microsoft.com"
});