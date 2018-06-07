const Parser = require('rss-parser');
const parser = new Parser();

module.exports = (id, bot) => {
    (async () => {
        const feed = await parser.parseURL('https://vnexpress.net/rss/tin-moi-nhat.rss');
        let first = 0; let last = 4; let elements = [];
        for (let i = first; i < last; i++) {
            if (feed.items[i].title !== undefined && feed.items[i].title !== "" && feed.items[i].link !== "") {
                let action = {
                    "type": "web_url",
                    "url": feed.items[i].link.replace('http', 'https'),
                    "messenger_extensions": true,
                    "webview_height_ratio": "FULL"
                };
                elements.push({title: feed.items[i].title, subtitle: feed.items[i].link, default_action: action});
            } else {
                first++;
                last++;
            }
            if (i === last - 1) bot.say(id, "Xin chào! Chúng tôi đem đến cho bạn tin tức mới nhất trong ngày!").then(() => bot.sendListTemplate(id, elements, undefined));
        }
    })();
};