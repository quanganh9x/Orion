const cognitive = require('cognitive-services');
const API_KEY = "6afc4a0071c245d6a098daaf1cd47984";
const face = new cognitive.face({
    apiKey: API_KEY,
    endpoint: "westcentralus.api.cognitive.microsoft.com"
});

module.exports = (obj, onlyDetect, convo, intellibot) => {
    let parameters = {
        returnFaceId: "true",
        returnFaceLandmarks: "false"
    };
    if (onlyDetect) parameters.returnFaceAttributes = "age,gender,smile";
    else var authorizedIds = [];
    const headers = {
        'Content-Type': 'application/json'
    };
    for (let i = 0; i < obj.length; i++) {
        if (obj[i].payload.type !== "image") continue;
        (async () => {
            let body = await {
                url: obj[i].payload.url
            };
            face.detect({
                parameters,
                headers,
                body
            }).then((response) => {
                console.log(JSON.stringify(response));
                if (onlyDetect) {
                    let attributes = {
                        age: response[0].faceAttributes.age,
                        gender: response[0].faceAttributes.gender === "male" ? "Nam" : "Nữ",
                        smile: Math.ceil(response[0].faceAttributes.smile * 100),
                    };
                    let vertices = {
                        y1: response[0].faceRectangle.top,
                        x1: response[0].faceRectangle.left,
                        y2: response[0].faceRectangle.top + response[0].faceRectangle.height,
                        x2: response[0].faceRectangle.left + response[0].faceRectangle.width
                    };
                } else for (let k = 0; k < response.length; k++) {
                    authorizedIds.push(response[k].faceId);
                }
            }).catch((err) => {
                console.error(err);
                convo.say("Không định dạng được ảnh :(").then(() => intellibot(convo));
            });
        })();
    }
    return authorizedIds;
};