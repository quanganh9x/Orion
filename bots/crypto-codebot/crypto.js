var crysptoJS = require('crypto-js');
// var md5 = require('crypto-js/md5');
// var sha1 = require('crypto-js/sha1');
// var sha256 = require('crypto-js/sha256');
// var sha224 = require('crypto-js/sha224');
// var sha512 = require('crypto-js/sha512');
// var sha384 = require('crypto-js/sha384');
// var sha3 = require('crypto-js/sha3');
// var ripemd160 = require('crypto-js/ripemd160');

module.exports = (buf, from, convo) => {
  var hashMD5 = crysptoJS.md5(buf);
  var hashSHA1 = crysptoJS.sha1(buf);
  var hashSHA256 = crysptoJS.SHA256(buf);
  var hashSHA224 = crysptoJS.SHA224(buf);
  var hashSHA512 = crysptoJS.SHA512(buf);
  var hashSHA384 = crysptoJS.SHA384(buf);
  var hashSHA3 = crysptoJS.SHA3(buf);
  var hashRIPEMD160 = crysptoJS.RIPEMD160(buf);
  convo.say("MD5 : " + hashMD5.toString(CryptoJS.enc.Hex) +
          "\n SHA1 :  " + hashSHA1.toString(CryptoJS.enc.Hex) +
          "\n SHA256 :  " + hashSHA256.toString(CryptoJS.enc.Hex) +
          "\n SHA224 :  " + hashSHA224.toString(CryptoJS.enc.Hex) +
          "\n SHA512 :  " + hashSHA512.toString(CryptoJS.enc.Hex) +
          "\n SHA384 :  " + hashSHA384.toString(CryptoJS.enc.Hex) +
          "\n SHA3 :  " + hashSHA3.toString(CryptoJS.enc.Hex) +
          "\n RIPEMD160 :  " + hashRIPEMD160.toString(CryptoJS.enc.Hex) +
          
  ); 
};