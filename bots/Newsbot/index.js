var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var vnExpress = "https://vnexpress.net";

console.log("Ban dang doc bao tai trang " + vnExpress);
request(vnExpress, function(err, response, body) {
	if (err){
		console.log("Error: " + err);
	}

	   if(response.statusCode === 200) {
     // Parse the document body
     var $ = cheerio.load(body);
     for (var i = 0; i < 5; i++) {
     	console.log("Tin moi nhat :  " + $('.list_news').slice(i).text());
     }
     var news = "Tin moi nhat :  " + $('.list_news').slice(i).text()
   }
});

module.exports = function (bot) {
	bot.hear(['tin tức', 'đọc báo', 'tin mới'], (payload, chat) => {
  chat.getUserProfile().then((user) => {
    chat.say(`Hello, ${user.first_name}!`).then.then(() => {
    	chat.say({
    		text: news

    	});
  });
});
}