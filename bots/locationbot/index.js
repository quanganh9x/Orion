var WEATHER_API = 'api.openweathermap.org/data/2.5/weather?';

/////////////////////////////// Thời tiết bot ////////////////////////////
module.exports = function (bot) {
    bot.hear(['weather'], (payload, chat) => {
        chat.conversation((convo) => {
            convo.question("Bạn ở đâu (không trốn đc đâu hihi)", (payload, convo) => {
                if (payload.message.attachments[0].payload.coordinates) { //có phải location
                    var lat = payload.message.attachments[0].payload.coordinates.lat;
                    var long = payload.message.attachments[0].payload.coordinates.long;

                    fetch(WEATHER_API + "lat=" + lat + "&lon=" + long + "&APPID=781a4ff410c47f5131129f221c2dcc44")
                      .then(
                        function(response) {
                            if (response.status !== 200) {
                                console.log('Lỗi??? ' + response.status);
                                return;
                            }                           
                            response.json().then(function(data) {
                                var location = data.name;
                                var tempF = data.main.temp;
                                var tempC = (tempF - 33.8)/1.8;
                                var condition = data.weather.description;
                                if (tempC > 45) {
                                   convo.say("Trái đất tiêu rùi");
                                   convo.sendAttachment('image', 'https://media1.tenor.com/images/71b3af3541f226215a579fb96386fc35/tenor.gif?itemid=4808980');
                                } else if (tempC < -40) {
                                    convo.say("Kỉ băng hà ?");
                                } else convo.say("Thời tiết bây giờ ở " + location + " là " + tempC + "oC, " + tempF + "oF.");
                            });
                        }
                    );
                }
            });
            convo.say("Bản tin thời tiết tới đây là kết thúc, xin nhường chỗ cho các chương trình khác~");
            convo.end(); // trả về thông tin cho người dùng xong thì end conversation
        });
    });
}
