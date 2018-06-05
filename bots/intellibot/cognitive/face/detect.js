const cognitive = require('cognitive-services');
const API_KEY = "6afc4a0071c245d6a098daaf1cd47984";
const https = require('https');
const gm = require('gm');
const draw = require('../draw');
const face = new cognitive.face({
    apiKey: API_KEY,
    endpoint: "westcentralus.api.cognitive.microsoft.com"
});

module.exports = (obj, onlyDetect, convo, intellibot) => {
    const parameters = {
        returnFaceId: "true",
        returnFaceLandmarks: "false",
        returnFaceAttributes: "age,gender,smile"
    };
    let authorizedIds = [];
    const headers = {
        'Content-Type': 'application/json'
    };
    for (let i = 0; i < obj.length; i++) {
        if (obj[i].type !== "image") continue;
        let body = {
            url: obj[i].payload.url
        };
        const imgProcess = new Promise((resolve) => {
            https.get(obj[i].payload.url, (res) => {
                resolve(res);
            });
        });
        imgProcess.then(res => {
            const img = gm(res);
            face.detect({
                parameters,
                headers,
                body
            }).then((response) => {
                for (let k = 0; k < response.length; k++) {
                    (async () => {
                        let vertices = await {
                            y1: response[k].faceRectangle.top,
                            x1: response[k].faceRectangle.left,
                            y2: response[k].faceRectangle.top + response[0].faceRectangle.height,
                            x2: response[k].faceRectangle.left + response[0].faceRectangle.width
                        };
                        draw.drawImg(img, vertices);
                        draw.drawFaceText(img, vertices, 20, 5, 20, (k+1) + ": " + response[k].faceAttributes.age + " tuổi, " + (response[k].faceAttributes.gender === "male" ? "Nam" : "Nữ") + ", " + Math.ceil(response[k].faceAttributes.smile * 100) + "%")
                        authorizedIds.push(response[k].faceId);
                    })();
                }
                if (onlyDetect) draw.getFormat(obj[i].payload.url).then((type) => draw.writeVisionImg(img, type, convo));
            }).catch((err) => {
                console.error(err);
                convo.say("Không định dạng được ảnh :(").then(() => intellibot(convo));
            });
        });
    }
    if (onlyDetect) return intellibot(convo);
    return authorizedIds;
};