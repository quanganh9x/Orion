const profileAPI = require('./api/profile');
const secAPI = require('./api/secbot');

module.exports = function (router, bot) {
    profileAPI(router);
    secAPI(router, bot);
};