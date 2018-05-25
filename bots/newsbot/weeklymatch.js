var unirest = require('unirest');
var bodyParser = require('body-parser');
var weekly_match_url = "https://stroccoli-futbol-science-v1.p.mashape.com/s1/calendar/2018-05-25/2018-05-31?tournament_name=Premier+League"


module.exports = function (chat) {
	unirest.get(weekly_match_url);
	.header("X-Mashape-Key", "QsdW6UVFLVmsh5Q5CFmKsNms5QeUp1lf3bLjsnlfSpx4pBbEAc")
	.header("Accept", "application/json")
	.end(function (result) {
		console.log(result.status, result.headers, result.body);
		var match_season = bodyParser.json(result.body.season);
		var match_name = bodyParser.json(result.body.event_name);
		var match_date = bodyParser.json(result.body.date);
		var match_stadium = bodyParser.json(result.body.stadium);
		var newsResult = bodyParser.json(result.body);
		chat.say('Thông tin các trận đấu nổi bật trong tuần').then(() => {
			chat.say('1. Mùa giải: ' + match_season);
			chat.say('2. Đội: ' + match_name);
			chat.say('3. Thời gian diễn ra: ' + match_date);
			chat.say('4. Sân vận động: ' + match_stadium);

		});
	});
}
