var crysptoJS = require('crypto-js');

const keyless = (buf, convo) => {
  var hashMD5 = cryptoJS.MD5(buf);
  var hashSHA1 = cryptoJS.SHA1(buf);
  var hashSHA256 = cryptoJS.SHA256(buf);
  var hashSHA224 = cryptoJS.SHA224(buf);
  var hashSHA512 = cryptoJS.SHA512(buf);
  var hashSHA384 = cryptoJS.SHA384(buf);
  var hashSHA3 = cryptoJS.SHA3(buf);
  var hashRIPEMD160 = cryptoJS.RIPEMD160(buf);
  convo.say("Của bạn này");
  convo.say("MD5 : " + hashMD5.toString(cryptoJS.enc.Utf8) +
    "\n SHA1 :  " + hashSHA1.toString(cryptoJS.enc.Utf8) +
    "\n SHA256 :  " + hashSHA256.toString(cryptoJS.enc.Utf8) +
    "\n SHA224 :  " + hashSHA224.toString(cryptoJS.enc.Utf8) +
    "\n SHA512 :  " + hashSHA512.toString(cryptoJS.enc.Utf8) +
    "\n SHA384 :  " + hashSHA384.toString(cryptoJS.enc.Utf8) +
    "\n SHA3 :  " + hashSHA3.toString(cryptoJS.enc.Utf8) +
    "\n RIPEMD160 :  " + hashRIPEMD160.toString(cryptoJS.enc.Utf8));
}

const hmac = (buf, keyHMAC, convo) => {
  var hashHmacSHA1 = cryptoJS.HmacSHA1(buf, keyHMAC);
  var hashHmacSHA256 = cryptoJS.HmacSHA256(buf, keyHMAC);
  convo.say("Của bạn này");
  convo.say(
    "HMAC-SHA1 +  :  " + hashHmacSHA1.toString(cryptoJS.enc.Base64.stringify(CryptoJS.Utf8.parse(buf))) +
    "\n HMAC-SHA256 +  :  " + hashHmacSHA256.toString(cryptoJS.enc.Base64.stringify(CryptoJS.Utf8.parse(buf)))
  );
}
const aes = (buf, keyAES, convo) => {
  var hashAES = crypto.AES.encrypt(buf, keyAES);

  convo.say("Của bạn này");
  convo.say(
    "AES +  :  " + hashAES.toString(cryptoJS.enc.Utf8)
  );
}

module.exports = () => {
  keyless,
    hmac,
    aes
};
