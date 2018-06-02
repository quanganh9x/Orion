const cryptoJS = require('crypto-js');

const normal = (data, convo, cryptobot) => {
    (async () => {
        const hashMD5 = await cryptoJS.MD5(data).toString();
        const hashSHA1 = await cryptoJS.SHA1(data).toString();
        const hashSHA256 = await cryptoJS.SHA256(data).toString();
        const hashSHA224 = await cryptoJS.SHA224(data).toString();
        const hashSHA512 = await cryptoJS.SHA512(data).toString();
        const hashSHA384 = await cryptoJS.SHA384(data).toString();
        const hashSHA3 = await cryptoJS.SHA3(data).toString();
        const hashRIPEMD160 = await cryptoJS.RIPEMD160(data).toString();
        convo.say("MD5: " + hashMD5 +
            "\nSHA1: " + hashSHA1 +
            "\nSHA256: " + hashSHA256 +
            "\nSHA224: " + hashSHA224 +
            "\nSHA512: " + hashSHA512 +
            "\nSHA384: " + hashSHA384 +
            "\nSHA3: " + hashSHA3 +
            "\nRIPEMD160: " + hashRIPEMD160).then(() => cryptobot(convo));
    })();
};

const hmac = (data, key, base64, convo, cryptobot) => {
    (async () => {
        let hashHmacMD5 = await cryptoJS.HmacMD5(data, key);
        let hashHmacSHA1 = await cryptoJS.HmacSHA1(data, key);
        let hashHmacSHA256 = await cryptoJS.HmacSHA256(data, key);
        if (base64) {
            hashHmacMD5 = await hashHmacMD5.toString(cryptoJS.enc.Base64);
            hashHmacSHA1 = await hashHmacSHA1.toString(cryptoJS.enc.Base64);
            hashHmacSHA256 = await hashHmacSHA256.toString(cryptoJS.enc.Base64);
        } else {
            hashHmacMD5 = await hashHmacMD5.toString();
            hashHmacSHA1 = await hashHmacSHA1.toString();
            hashHmacSHA256 = await hashHmacSHA256.toString();
        }
        convo.say("HMAC-MD5: " + hashHmacMD5 +
            "\nHMAC-SHA1: " + hashHmacSHA1+
            "\nHMAC-SHA256: " + hashHmacSHA256).then(() => cryptobot(convo));
    })();
};

const aes = (data, key, convo) => {
    (async () => {
        const hashAES = await cryptoJS.AES.encrypt(data, key).toString();
        convo.say("AES: " + hashAES).then(() => cryptobot(convo));
    })();
};

const base64 = (data, mode, convo, cryptobot) => {
    if (mode === "decrypt") convo.say("UTF-8: " + cryptoJS.enc.Base64.parse(data)).then(() => cryptobot(convo));
    else convo.say("Base64: " + cryptoJS.enc.Base64.stringify(data)).then(() => cryptobot(convo));
};

module.exports = {
    normal,
    hmac,
    aes,
    base64
};
