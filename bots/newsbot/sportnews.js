var unirest = required('unirest');
var bodyParser = require('body-parser')

module.exports = function (chat) {
// These code snippets use an open-source library. http://unirest.io/nodejs
unirest.get("https://stroccoli-futbol-science-v1.p.mashape.com/s1/calendar/2017-01-01/2017-01-01?tournament_name=Premier+League")
.header("X-Mashape-Key", "QsdW6UVFLVmsh5Q5CFmKsNms5QeUp1lf3bLjsnlfSpx4pBbEAc")
.header("Accept", "application/json")
.end(function (result) {
  console.log(result.status, result.headers, result.body);
  newsResult = bodyParser.json(result.body);
  chat.say('Giải ngoại hạng anh: ' + newsResult);
  
});


	
};