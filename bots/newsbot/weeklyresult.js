var unirest = require('unirest');
var bodyParser = require('body-parser');
var weekly_results_url = "https://stroccoli-futbol-science-v1.p.mashape.com/s1/results/2018-05-25/2018-05-31?tournament_name=Premier+League"



module.exports = function (chat) {
// These code snippets use an open-source library. http://unirest.io/nodejs
unirest.get(weekly_results_url)
.header("X-Mashape-Key", "QsdW6UVFLVmsh5Q5CFmKsNms5QeUp1lf3bLjsnlfSpx4pBbEAc")
.header("Accept", "application/json")
.end(function (result) {
	var match_season = bodyParser.json(result.body.season);
	var match_name = bodyParser.json(result.body.event_name);
	var match_date = bodyParser.json(result.body.date);
	var match_stadium = bodyParser.json(result.body.stadium);
	var visitant_outcome = bodyParser.json(result.body.visitant_team.stats.outcome);
	var visitant_score = bodyParser.json(result.body.visitant_team.stats.score);
	var visitant_name = bodyParser.json(result.body.visitant_team.name.abbrev);
	var hometeam_name = bodyParser.json(result.body.home_team.name.abbrev);
	var hometeam_score = bodyParser.json(result.body.home_team.stats.score);
	var hometeam_outcome = bodyParser.json(result.body.home_team.stats.outcome);
	chat.say('Chung cuộc: ' + hometeam_name +"-"+ hometeam_outcome +" | "+visitant_name +"-"+visitant_outcome);
	chat.say('Tỉ Số: ' + hometeam_name +"-"+ hometeam_score +" | "+visitant_name +"-"+visitant_score);
	chat.say('Thời gian: '+match_date);
});
}