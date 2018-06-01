const qrGen = require('qr-image');
const QrCode = require('qrcode-reader');
const jimp = require("jimp");
const uniqueFilename = require('unique-filename');
const homeDir = process.env.HOME_DIR;
const homeURL = process.env.HOME_URL;

const qrReader = (img, convo, cryptobot) => {
    jimp.read(img).then((image) => {
        const qr = new QrCode();
        qr.callback = function (err, value) {
            if (err) {
                convo.say(":( khong doc duoc").then(() => cryptobot(convo));
            }
            convo.say("Ket qua: " + value.result).then(() => cryptobot(convo));
        };
        qr.decode(image.bitmap);
    }).catch((err) => {
        console.log("err read qr: " + err);
        convo.say(":( khong doc duoc").then(() => cryptobot(convo));
    });
};

const qrGenerator = (input, convo, cryptobot) => {
    jimp.read(qrGen.imageSync(input, {ec_level: 'H'})).then((image) => {
            const generated = uniqueFilename('', 'generatedQR');
            const path = homeDir + "/public/uploads/images/qr/" + generated + ".png";
            const publicPath = homeURL + "/uploads/images/qr/" + generated + ".png";
            image.write(path, (err) => {
                if (err) {
                    console.log("err write qr: " + err);
                    convo.say(":( khong xuat duoc anh").then(() => cryptobot(convo));
                } else {
                    convo.say("Mã QR của bạn đây").then(() => {
                        convo.sendAttachment('image', publicPath);
                        cryptobot(convo);
                    });
                }
            });
    }).catch((err) => {
        console.log("err write qr: " + err);
        convo.say(":( khong xuat duoc anh").then(() => cryptobot(convo));
    });
};

module.exports = {
    qrReader,
    qrGenerator
};