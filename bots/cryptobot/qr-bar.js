const ZXing = require('@zxing/library');

const qrReader = (img, convo, cryptobot) => {
    const qrCodeReader = new ZXing.BrowserQRCodeReader();
    qrCodeReader.decodeFromImage(undefined, img).then((result) => {
        convo.say("Kết quả của bạn đây : " + result.text).then(() => cryptobot(convo));
    }).catch((err) => {
        console.error(err);
    });
};

const barReader = (img, convo, cryptobot) => {
    const barCodeReader = new ZXing.BrowserBarcodeReader();
    barCodeReader.decodeFromImage(undefined, img).then((result) => {
        convo.say("Kết quả của bạn đây : " + result.text).then(() => cryptobot(convo));
    }).catch((err) => {
        console.error(err);
    });
};

const codeWriter = (input, convo, cryptobot) => {
    const qrCodeWriter = new ZXing.BrowserQRCodeSvgWriter();
    const qrSvgElement = qrCodeWriter.write(input, 300, 300);
    convo.sendAttachment('image', qrSvgElement).then(() => cryptobot(convo));
};

module.exports = {
    qrReader,
    barReader,
    codeWriter
};