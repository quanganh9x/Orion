const uniqueFilename = require('unique-filename');
const path = require('path');
const gm = require('gm');
const homeDir = (process.platform == 'win32') ? path.join(__dirname, '..', '..', '..', 'public') : process.env.HOME_DIR;
const homeURL = process.env.HOME_URL;

const drawVisionImg = (img, vertices, fdVertices) => {
    img
        .stroke("#8CEF25", 2).fill("none")
        .drawRectangle(vertices.x1, vertices.y1, vertices.x2, vertices.y2)
        .drawRectangle(fdVertices.x1, fdVertices.y1, fdVertices.x2, fdVertices.y2);
};

const drawVisionText = (img, vertices, fdVertices, font, text) => {
    img
        .fontSize(font)
        .drawText(vertices.x1 + (fdVertices.x1 - vertices.x1) / 2, vertices.y1 + (fdVertices.y1 - vertices.y1) / 2, text);
};

const writeVisionImg = (img, convo) => {
    img.format((err, value) => {
        if (err) value = "jpg";
        else {
            (async () => {
                const generated = uniqueFilename('', 'generatedFace');
                const imgPath = path.join(homeDir, "/uploads/images/face", generated + "." + value);
                const imgURL = homeURL + "/uploads/images/face/" + generated + "." + value;
                img.write(imgPath, (err) => {
                    if (err) {
                        console.log(err);
                        convo.say("Không tạo được ảnh :(");
                    }
                    else convo.sendAttachment('image', imgURL);
                });
            })();
        }
    });
};

module.exports = {
    drawVisionImg,
    drawVisionText,
    writeVisionImg
};