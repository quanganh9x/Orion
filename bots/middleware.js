module.exports = function (req, res, next) {
    (async () => {
        if (req.body.entry && req.body.entry[0].messaging) {
            if (req.body.entry[0].messaging[0].postback && !req.body.entry[0].messaging[0].message) {
                if (!req.body.entry[0].messaging[0].postback.payload.includes("BOOTBOT")) {
                    req.body.entry[0].messaging[0].message = await {
                        text: req.body.entry[0].messaging[0].postback.title,
                        event: req.body.entry[0].messaging[0].postback.payload
                    };
                    await delete req.body.entry[0].messaging[0].postback;
                }
            } // postback converter
            /*if (req.body.entry[0].messaging[0].message && req.body.entry[0].messaging[0].message.nlp && req.body.entry[0].messaging[0].message.nlp.entities && req.body.entry[0].messaging[0].message.text) {
                if (req.body.entry[0].messaging[0].message.nlp.entities.bots && req.body.entry[0].messaging[0].message.nlp.entities.bots.length !== 0)
                req.body.entry[0].messaging[0].message.text = req.body.entry[0].messaging[0].message.nlp.entities.bots[0].value;
            }*/
        }
        next();
    })();
};