const request = require('request');
const base64img = require('base64-img');
const gm = require('gm');
const draw = require('./draw');
const Translate = require('@google-cloud/translate');
const translate = new Translate({
    key: process.env.GOOGLE_API_KEY
});

const FACE_PERCENT = 0.6;
const LABEL_PERCENT = 0.4;

module.exports = (convo, intellibot) => {
    convo.ask('Bạn upload ảnh lên cho mình nhé :)', (payload, convo) => {
        if (payload.message.attachments[0].type === 'image') {
            base64img.requestBase64(payload.message.attachments[0].payload.url, function(err, res, body) {
                if (res) {
                    (async () => {
                        const data = await '{"requests":[{"image":{"content":"'+ body.replace(/^data.*base64,/, '') +'"},"features":[{"type":"TYPE_UNSPECIFIED","maxResults":50},{"type":"LANDMARK_DETECTION","maxResults":50},{"type":"FACE_DETECTION","maxResults":50},{"type":"LOGO_DETECTION","maxResults":50},{"type":"LABEL_DETECTION","maxResults":50},{"type":"DOCUMENT_TEXT_DETECTION","maxResults":50},{"type":"SAFE_SEARCH_DETECTION","maxResults":50},{"type":"IMAGE_PROPERTIES","maxResults":50},{"type":"CROP_HINTS","maxResults":50},{"type":"WEB_DETECTION","maxResults":50}],"imageContext":{"cropHintsParams":{"aspectRatios":[0.8,1,1.2]}}}]}';
                        request.post({
                            url: 'https://cxl-services.appspot.com/proxy?url=https://vision.googleapis.com/v1/images:annotate',
                            headers: {
                                'Content-Type': 'application/json',
                                'Origin': 'https://cloud.google.com',
                                'Referer': 'https://cloud.google.com',
                                'Pragma': 'no-cache',
                                'Cache-Control': 'no-cache',
                                'Host': 'cxl-services.appspot.com',
                                'Accept': 'application/json'
                            },
                            body: data
                        }, (err, response, body) => {
                            (async () => {
                                body = await JSON.parse(body);
                                body = await body.responses[0];
                                if (body.faceAnnotations && body.faceAnnotations.length !== 0) {
                                    await convo.say("Ảnh có mặt người");
                                    const img = await gm(request(payload.message.attachments[0].payload.url));
                                    for (let i = 0; i < body.faceAnnotations.length; i++) {
                                        if (body.faceAnnotations[i].detectionConfidence >= FACE_PERCENT) {
                                            let vertices = await {
                                                x1: body.faceAnnotations[i].boundingPoly.vertices[0].x,
                                                y1: body.faceAnnotations[i].boundingPoly.vertices[0].y
                                            };
                                            for (let k = 0; k < body.faceAnnotations[i].boundingPoly.vertices.length; k++) {
                                                if (vertices.x1 !== body.faceAnnotations[i].boundingPoly.vertices[k].x) vertices.x2 = await body.faceAnnotations[i].boundingPoly.vertices[k].x;
                                                if (vertices.y1 !== body.faceAnnotations[i].boundingPoly.vertices[k].y) vertices.y2 = await body.faceAnnotations[i].boundingPoly.vertices[k].y;
                                            }
                                            let fdVertices = await {
                                                x1: body.faceAnnotations[i].fdBoundingPoly.vertices[0].x,
                                                y1: body.faceAnnotations[i].fdBoundingPoly.vertices[0].y
                                            };
                                            for (let k = 0; k < body.faceAnnotations[i].fdBoundingPoly.vertices.length; k++) {
                                                if (fdVertices.x1 !== body.faceAnnotations[i].fdBoundingPoly.vertices[k].x) fdVertices.x2 = await body.faceAnnotations[i].fdBoundingPoly.vertices[k].x;
                                                if (fdVertices.y1 !== body.faceAnnotations[i].fdBoundingPoly.vertices[k].y) fdVertices.y2 = await body.faceAnnotations[i].fdBoundingPoly.vertices[k].y;
                                            }
                                            await draw.drawVisionImg(img, vertices, fdVertices);
                                            await draw.drawVisionText(img, vertices, fdVertices, 20, i+1);
                                        }
                                        if (i === body.faceAnnotations.length - 1) await draw.writeVisionImg(img, convo);
                                    }
                                }
                                let labelAnnotations = "Mô tả chi tiết: ";
                                for (let i = 0; i < body.labelAnnotations.length; i++) {
                                    await translate.translate(body.labelAnnotations[i].description, 'vi').then(response => {
                                        if (body.labelAnnotations[i].score > LABEL_PERCENT)
                                        labelAnnotations += response[0] + " - " + Math.ceil(body.labelAnnotations[i].score*100) + "%, "
                                    }).catch(err => {
                                        console.log(err);
                                        labelAnnotations += body.labelAnnotations[i].description + " - " + body.labelAnnotations[i].score + ", ";
                                    });
                                    if (i === body.labelAnnotations.length - 1) await convo.say(labelAnnotations);
                                }
                                let webDetection = "";
                                if (body.webDetection.bestGuessLabels) {
                                    webDetection += "Từ khóa: ";
                                    let count = body.webDetection.bestGuessLabels.length > 3 ? 3 : body.webDetection.bestGuessLabels.length;
                                    for (let i = 0; i < count; i++) {
                                        webDetection += body.webDetection.bestGuessLabels[i].label + ", ";
                                    }
                                }
                                if (body.webDetection.pagesWithMatchingImages) {
                                    webDetection += "\nCác trang chứa ảnh này:\n";
                                    let count = body.webDetection.pagesWithMatchingImages.length > 3 ? 3 : body.webDetection.pagesWithMatchingImages.length;
                                    for (let i = 0; i < count; i++) {
                                        webDetection += body.webDetection.pagesWithMatchingImages[i].url + "\n";
                                        if (i === count - 1) convo.say(webDetection);
                                    }
                                } else convo.say(webDetection);
                                intellibot(convo);
                            })();
                        })
                    })();
                } else {
                    convo.say("Không lấy được ảnh :(");
                    intellibot(convo);
                }
            });
        }
    });
};