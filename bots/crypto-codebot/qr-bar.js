const ZXing = require('@zxing/library');

const qrReader = (img, convo) => {
  const qrCodeReader = new ZXing.BrowserQRCodeReader();
  qrCodeReader.decodeFromImage(img).then((result) => {
    convo.say("Kết quả của bạn đây : " + result.text);
  }).catch((err) => {
    console.error(err);
  });
}

const barReader = (img, convo) => {
  const barCodeReder = new ZXing.BrowserBarcodeReader();
  barCodeReder.decodeFromImage(img).then((result) => {
    convo.say("Kết quả của bạn đây : " + result.text);
  }).catch((err) => {
    console.error(err);
  });
}

const codeWriter = (input, convo) => {
  const qrCodeWriter = new ZXing.BrowserQRCodeSvgWriter();
  var qrSvgElement = qrCodeWriter.write(input, 300, 300);
  convo.say("Mã QR của bạn đây");
  convo.sendAttachment('image', qrSvgElement);
}
module.exports = () => {
  qrReader,
    barReader,
    codeWriter
}