const uniqueFilename = require('unique-filename');
const path = require('path');
const jimp = require('jimp');
const homeDir = (process.platform == 'win32') ? path.join(__dirname, '..', '..', '..', 'public') : process.env.HOME_DIR;
const homeURL = process.env.HOME_URL;

const drawImg = (img, vertices) => {
    img
        .stroke("#8CEF25", 2).fill("none")
        .drawRectangle(vertices.x1, vertices.y1, vertices.x2, vertices.y2)
};

const drawVisionText = (img, vertices, fdVertices, font, text) => {
    img
        .fontSize(font)
        .drawText(vertices.x1 + (fdVertices.x1 - vertices.x1) / 2, vertices.y1 + (fdVertices.y1 - vertices.y1) / 2, text);
};

const drawFaceText = (img, vertices, separateRect, separateText, font, text) => {
    img
        .fontSize(font)
        .drawText(vertices.x1 - separateRect, vertices.y2 + separateRect + separateText, text);
};

const getFormat = (imgUrl) => {
    return new Promise((resolve) => {
        jimp.read(imgUrl).then(image => {
            resolve(image.getExtension());
        });
    });
};

const writeVisionImg = (img, value, convo) => {
    (async () => {
        const generated = await uniqueFilename('', 'generatedPic');
        const imgPath = await path.join(homeDir, "/uploads/images/face", generated + "." + value);
        const imgURL = await homeURL + "/uploads/images/face/" + generated + "." + value;
        img.write(imgPath, (err) => {
            if (err) {
                console.log(err);
                convo.say("Không tạo được ảnh :(");
            }
            else convo.sendAttachment('image', imgURL);
        });
    })();
};

module.exports = {
    drawImg,
    drawVisionText,
    drawFaceText,
    writeVisionImg,
    getFormat
};