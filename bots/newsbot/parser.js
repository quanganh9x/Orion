const Parser = require('rss-parser');
const parser = new Parser();

module.exports = function (url, convo) {
    (async () => {
        let feed = await parser.parseURL(url);
        convo.say("Tin được lấy từ: " + feed.title).then(() => {
            for (let i = 0; i < 5; i++) {
                convo.say(feed.items[i].title + '\n' + feed.items[i].link);
            }
        });
    })();
};