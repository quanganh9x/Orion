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
        await convo.say("MD5: " + hashMD5);
        await convo.say("SHA1: " + hashSHA1);
        await convo.say("SHA256: " + hashSHA256);
        await convo.say("SHA224: " + hashSHA224);
        await convo.say("SHA512: " + hashSHA512);
        await convo.say("SHA384: " + hashSHA384);
        await convo.say("SHA3: " + hashSHA3);
        await convo.say("RIPEMD160: " + hashRIPEMD160);
        cryptobot(convo);
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
        await convo.say("HMAC-MD5: " + hashHmacMD5);
        await convo.say("HMAC-SHA1: " + hashHmacSHA1);
        await convo.say("HMAC-SHA256: " + hashHmacSHA256);
        cryptobot(convo);
    })();
};

const aes = (data, key, convo, cryptobot) => {
    (async () => {
        const hashAES = await cryptoJS.AES.encrypt(data, key).toString();
        convo.say("AES: " + hashAES).then(() => cryptobot(convo));
    })();
};

const base64 = (data, mode, convo, cryptobot) => {
    if (mode === "decrypt") convo.say("UTF-8: " + cryptoJS.enc.Base64.parse(data).toString(cryptoJS.enc.Utf8)).then(() => cryptobot(convo));
    else convo.say("Base64: " + CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data))).then(() => cryptobot(convo));
};

module.exports = {
    normal,
    hmac,
    aes,
    base64
};
