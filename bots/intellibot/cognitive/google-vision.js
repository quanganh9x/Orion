const request = require('request');
const base64img = require('base64-img');
const Translate = require('@google-cloud/translate');
const translate = new Translate({
    key: process.env.GOOGLE_API_KEY
});

const FACE_PERCENT = 0.6;
const LABEL_PERCENT = 0.4;

module.exports = (convo, intellibot) => {
    convo.ask('Bạn upload ảnh muốn lấy chi tiết lên cho mình nhé :) (mình không có lưu lại đâu :P)', (payload, convo) => {
        if (payload.message.attachments[0].type === 'image') {
            base64img.requestBase64(payload.message.attachments[0].payload.url, function(err, res, body) {
                if (res && res.statusCode == 200) {
                    (async () => {
                        const data = await '{"requests":[{"image":{"content":"'+ body.replace('data:image/png;base64,', '') +'"},"features":[{"type":"TYPE_UNSPECIFIED","maxResults":50},{"type":"LANDMARK_DETECTION","maxResults":50},{"type":"FACE_DETECTION","maxResults":50},{"type":"LOGO_DETECTION","maxResults":50},{"type":"LABEL_DETECTION","maxResults":50},{"type":"DOCUMENT_TEXT_DETECTION","maxResults":50},{"type":"SAFE_SEARCH_DETECTION","maxResults":50},{"type":"IMAGE_PROPERTIES","maxResults":50},{"type":"CROP_HINTS","maxResults":50},{"type":"WEB_DETECTION","maxResults":50}],"imageContext":{"cropHintsParams":{"aspectRatios":[0.8,1,1.2]}}}]}';
                        request.post({
                            url: 'https://cxl-services.appspot.com/proxy?url=https://vision.googleapis.com/v1/images:annotate',
                            headers: {
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
                                body = await body.responses[0];
                                if (body.faceAnnotations && body.faceAnnotations.length != 0) {
                                    if (body.faceAnnotations[0].detectionConfidence > FACE_PERCENT) {
                                        await convo.say("Ảnh có mặt người. Độ chắc chắn: " + Math.ceil(body.faceAnnotations[0].detectionConfidence*100) + "%");
                                    }
                                }
                                let labelAnnotations = "Mô tả về chi tiết:\n";
                                for (let i = 0; i < body.labelAnnotations.length; i++) {
                                    translate.translate(body.labelAnnotations[i].description, 'vi').then(response => {
                                        if (body.labelAnnotations[i].score > LABEL_PERCENT)
                                        labelAnnotations += response + " - " + body.labelAnnotations[i].score + "\n"
                                    }).catch(err => {
                                        console.log(err);
                                        labelAnnotations += body.labelAnnotations[i].description + " - " + body.labelAnnotations[i].score + "\n";
                                    });
                                    if (i == body.labelAnnotations.length - 1) await convo.say(labelAnnotations);
                                }
                                let webDetection = "Thông tin trên Internet:\n";
                                webDetection += "Từ khóa: " + body.webDetection.webEntities[0].description;
                                webDetection += "Các trang chứa ảnh này:\n";
                                const countURLs = body.webDetection.pagesWithMatchingImages.length > 5 ? 5 : body.webDetection.pagesWithMatchingImages.length;
                                for (let i = 0; i < countURLs; i++) {
                                    webDetection += body.webDetection.pagesWithMatchingImages[i].url + "\n"
                                    if (i == countURLs - 1) await convo.say(webDetection);
                                }
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