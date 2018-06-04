const cognitive = require('cognitive-services');
const API_KEY = "6afc4a0071c245d6a098daaf1cd47984";
const face = new cognitive.face({
    apiKey: API_KEY,
    endpoint: "westcentralus.api.cognitive.microsoft.com"
});

module.exports = (obj, onlyDetect, convo, intellibot) => {
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
            url: obj[i].payload.url
        };
        face.detect({
            parameters,
            headers,
            body
        }).then((response) => {
            console.log(JSON.stringify(response));
            if (onlyDetect) {
                const answer = {
                    age: response[0].faceAttributes.age,
                    gender: response[0].faceAttributes.gender === "male" ? "Nam" : "Nữ",
                    smile: Math.ceil(response[0].faceAttributes.smile*100),
                    rect: {
                        top: response[0].faceRectangle.top,
                        left: response[0].faceRectangle.left,
                        bottom: response[0].faceRectangle.top + response[0].faceRectangle.height,
                        right: response[0].faceRectangle.left + response[0].faceRectangle.width
                    }
                };
                return convo.say("Tuổi: " + answer.age + ", giới tính: " + answer.gender + ", cười: " + answer.smile + "%").then(() => intellibot(convo));
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