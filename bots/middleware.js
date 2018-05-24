const User = require('../models/user');
const Room = require('../models/connectbot-rooms');

module.exports = function (req, res, next) {
    (async () => {
        if (req.body.entry && req.body.entry[0].messaging) {
            if (req.body.entry[0].messaging[0].postback && !req.body.entry[0].messaging[0].message) {
                if (!req.body.entry[0].messaging[0].postback.payload.includes("BOOTBOT")) {
                    req.body.entry[0].messaging[0].message = {
                        text: req.body.entry[0].messaging[0].postback.title,
                        event: req.body.entry[0].messaging[0].postback.payload
                    };
                    delete req.body.entry[0].messaging[0].postback;
                }
            } // convert postback
        }
        next();
    })();
};