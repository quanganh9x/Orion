const cognitive = require('cognitive-services');
const API_KEY = "88bf58d157c64faf952c128a72e870d0";
const face = new cognitive.face({
    apiKey: API_KEY,
    endpoint: "westcentralus.api.cognitive.microsoft.com"
});

module.exports = (obj, onlyDetect) => {
    let authorizedIds = [];
    const parameters = {
        returnFaceId: "true",
        returnFaceLandmarks: "false"
    };
    if (onlyDetect) parameters.returnFaceAttributes = "age,gender,smile";
    const headers = {
        'Content-Type': 'application/json'
    };
    for (let i = 0; i < obj.length; i++) {
        let body = {
            url: obj.payload.url
        };
        face.detect({
            parameters,
            headers,
            body
        }).then((response) => {
            if (onlyDetect) {
                return {
                    age: response[0].faceAttributes.age,
                    gender: response[0].faceAttributes.gender === "male" ? "Nam" : "Nu",
                    smile: Math.ceil(response[0].smile*100)
                }
            }
            for (let k = 0; k < response.length; k++) {
                authorizedIds.push(response[k].faceId);
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    return authorizedIds;
};