const Parser = require('rss-parser');
const parser = new Parser();
const VNExpress_URL = 'https://vnexpress.net/rss/tin-moi-nhat.rss';

module.exports = function (chat) {
    (async () => {
        let feed = await parser.parseURL(VNExpress_URL);
        chat.say("Tin được lấy từ: " + feed.title).then(() => {
            for (let i = 0; i < 5; i++) {
                chat.say(feed.items[i].title + '\n' + feed.items[i].link);
            }
        });
    })();
};