var crysptoJS = require('crypto-js');

module.exports = (buf, convo) => {
  var hashMD5 = cryptoJS.MD5(buf);
  var hashSHA1 = cryptoJS.SHA1(buf);
  var hashSHA256 = cryptoJS.SHA256(buf);
  var hashSHA224 = cryptoJS.SHA224(buf);
  var hashSHA512 = cryptoJS.SHA512(buf);
  var hashSHA384 = cryptoJS.SHA384(buf);
  var hashSHA3 = cryptoJS.SHA3(buf);
  var hashRIPEMD160 = cryptoJS.RIPEMD160(buf);
  convo.say("Của bạn này");
  convo.say("MD5 : " + hashMD5.toString(cryptoJS.enc.Hex) +
          "\n SHA1 :  " + hashSHA1.toString(cryptoJS.enc.Hex) +
          "\n SHA256 :  " + hashSHA256.toString(cryptoJS.enc.Hex) +
          "\n SHA224 :  " + hashSHA224.toString(cryptoJS.enc.Hex) +
          "\n SHA512 :  " + hashSHA512.toString(cryptoJS.enc.Hex) +
          "\n SHA384 :  " + hashSHA384.toString(cryptoJS.enc.Hex) +
          "\n SHA3 :  " + hashSHA3.toString(cryptoJS.enc.Hex) +
          "\n RIPEMD160 :  " + hashRIPEMD160.toString(cryptoJS.enc.Hex)
          
  ); 
};