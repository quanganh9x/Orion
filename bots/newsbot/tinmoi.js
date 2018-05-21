const Parser = require('rss-parser');
const parser = new Parser();
const tinmoi_url = 'http://www.tinmoi.vn/rss/Tin-tuc.rss'

module.exports = function (chat) {
	(async () => {
		let feed = await parser.parseURL(VNExpress_URL);
		chat.say("Tin được lấy từ: " + feed.title).then(() => {
			for (let i = 0; i < 5; i++) {
				chat.say(feed.items[i].title + '\n' + feed.items[i].link);
			}
		}).then(() => {
			chat.say({
				text: 'Theo dõi tinmoi.vn',
				buttons: [
				{ type: 'web_url', url: "http://www.tinmoi.vn/", title: 'Theo dõi', payload: 'Subscribe' },
				{ type: 'element_share', title: 'Chia sẻ', payload: 'generic' },
				]
			});
		});
	})();

};