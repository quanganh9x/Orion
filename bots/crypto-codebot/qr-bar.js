var qr = require('qr-image');
var QrCode = require('qrcode-reader');
var qr = new QrCode();
var Jimp = require("jimp");
const fs = require('fs');

const qrReader = (img, convo) => {
  var buffer = fs.readFileSync(img);
  Jimp.read(buffer, function (err, image) {
    if (err) {
      console.error(err);
    }
    var qr = new QrCode();
    qr.callback = function (err, value) {
      if (err) {
        console.error(err);
      }
      convo.say("Mã QR của bạn đây");
      convo.say(value.result);      
    };
    
    
  });
}

const qrImage = (input, convo) => {
  var img = qr.image(input,{size : 7});
  convo.say("Mã QR của bạn đây");
  convo.sendAttachment('image', img);
}
module.exports = () => {
  qrReader,
    barReader,
    codeWriter
}