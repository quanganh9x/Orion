const Parser = require('rss-parser');
const parser = new Parser();

module.exports = function (url, convo, newsbot) {
    (async () => {
        let feed = await parser.parseURL(url);
        if (convo.get('pinpointFrom') === 0) await convo.say("Tin được lấy từ: " + (feed.generator === undefined ? feed.title : feed.generator) + " lúc " + new Date(Date.now()).toLocaleString('vi'));
        if (convo.get('pinpointEnd')) {
            convo.set('pinpoint', undefined);
            convo.sendListTemplate(getElements(feed, convo.get('pinpointFrom'), convo.get('pinpointFrom') + 4, convo), undefined, {topElementStyle: "compact"});
        } else convo.sendListTemplate(getElements(feed, convo.get('pinpointFrom'), convo.get('pinpointFrom') + 4, convo), [
            {
                "title": "Đọc thêm",
                "type": "postback",
                "payload": "SB_READ_MORE"
            }
        ], {topElementStyle: "compact"});
        newsbot(convo);
    })();
};

function getElements(feed, first, last, convo) {
    let elements = [];
    if (feed.items.length - last > 4 && feed.items.length - last < 8) {
        convo.set('pinpointEnd', true);
    }
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
            convo.set('pinpointFrom', convo.get('pinpointFrom') + 1);
            last++;
        }
    }
    return elements;
}