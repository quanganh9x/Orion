const path = require('path');
const homeDir = (process.platform == 'win32') ? path.join(process.env.USERPROFILE, 'public') : process.env.HOME_DIR;
const findRemoveSync = require('find-remove');

module.exports = () => {
    if (findRemoveSync(path.join(homeDir, "/uploads/images/qr"), {age: {seconds: 3600}})) console.log("removeQRs exec-ed successfully: " + new Date(Date.now()).toISOString());
    if (findRemoveSync(path.join(homeDir, "/uploads/images/face"), {age: {seconds: 3600}})) console.log("removeFaces exec-ed successfully: " + new Date(Date.now()).toISOString());
};