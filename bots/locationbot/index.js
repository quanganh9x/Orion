var WEATHER_API = 'api.openweathermap.org/data/2.5/';

/////////////////////////////// Thời tiết bot ////////////////////////////
module.exports = function (bot) {
    bot.hear(['weather'], (payload, chat) => {
        chat.conversation((convo) => {
            convo.question("Bạn ở đâu (không trốn đc đâu hihi)", (payload, convo) => {
                if (payload.message.attachments[0].payload.coordinates) {
                    var lat = payload.message.attachments[0].payload.coordinates.lat;
                    var long = payload.message.attachments[0].payload.coordinates.long;
                    request(WEATHER_API + "weather?lat=" + lat + "&lon=" + long + "&APPID=781a4ff410c47f5131129f221c2dcc44", function (error, response, body) {
                        if (response.status !== 200) {
                            console.log('Lỗi??? ' + response.status);
                            return;
                        }                           
                        body = JSON.parse(body);
                        var location = body.name;
                        var tempF = body.main.temp;
                        var tempC = (tempF - 33.8)/1.8;
                        var wMain = body.weather.main;
                        var iconUrl = "http://openweathermap.org/img/w/" + body.weather.icon + ".png";
                        if (tempC > 40) {
                           convo.say("Trái đất tiêu rùi");
                           convo.sendAttachment('image', 'https://media1.tenor.com/images/71b3af3541f226215a579fb96386fc35/tenor.gif?itemid=4808980');
                        } else if (tempC < -40) {
                            convo.say("Kỉ băng hà ?");
                        } else convo.say("Thời tiết bây giờ ở " + location + " là " + tempC + "oC, hoặc là " + tempF + "oF.");
                        convo.sendAttachment('image', iconUrl);
                        switch(wMain){
                            case "Rain": 
                            case "Thunderstorm":
                            case "Drizzle":
                                convo.say("Nhớ mặc áo mưa trước khi vô nhà 🤭 các bạn nhỏ, nhé"); // -_- 
                                break;
                            case "Clear": 
                                convo.say("Ui trời đẹp thế này mà không ở nhà thì phí quá :p");
                                break;
                            case "Snow": 
                                convo.say("o.O ... Đừng ăn tuyết nhé ..."); //imnotfunnyimsosorry
                                break;
                            case default: 
                                convo.say("Đeo khẩu trang và kính râm mọi lúc mọi nơi, như chị này nè");
                                convo.sendAttachment('image', 'http://sohanews.sohacdn.com/thumb_w/660/2016/adcc7288d693418599dfd291cad61400-1482982069105-0-0-310-500-crop-1482982103995.jpg');
                                break;
                        }
                    });
                }
            });
            convo.say("Bản tin thời tiết tới đây là kết thúc, xin nhường chỗ cho các chương trình khác~");
            convo.end(); 
        });
    });
}
