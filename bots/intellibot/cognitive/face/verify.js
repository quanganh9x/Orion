const cognitive = require('cognitive-services');

const face = new cognitive.face({
    apiKey: "88bf58d157c64faf952c128a72e870d0",
    endpoint: "westcentralus.api.cognitive.microsoft.com"
});

module.exports = (obj, convo, intellibot) => {
    const body = {
        faceId1: obj[0],
        faceId2: obj[1]
    };
    face.verify({
        body
    }).then((response) => {
        convo.say((response.isIdentical ? "Giong nhau" : "Khac nhau") + ". Do tin cay: " + Math.ceil(response.confidence*100)).then(() => {
            intellibot(convo);
        });
    });
};