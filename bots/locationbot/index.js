
module.exports = function (bot) {
    bot.hear(['weather'], (payload, chat) => {
        chat.conversation((convo) => {
            convo.question("Bạn ở đâu (không trốn đc đâu hihi)", (payload, convo) => {
                if (payload.message.attachments[0].payload.coordinates) { //có phải location
                    var lat = payload.message.attachments[0].payload.coordinates.lat;
                    var long = payload.message.attachments[0].payload.coordinates.long;

                    var query = new YQL('select * from weather.forecast where text="(' + lat + ',' + long + ')"');
                    query.exec(function(err, data) {
                      var location = data.query.results.channel.location;
                      var condition = data.query.results.channel.item.condition;
                      convo.set('địa điểm', location);
                      convo.set('thời tiết', condition);
                      convo.say("Oki kết quả");
                        if (condition.temp > 110) {
                           convo.say("Trái đất tiêu rùi");
                           convo.sendAttachment('image', 'https://media1.tenor.com/images/71b3af3541f226215a579fb96386fc35/tenor.gif?itemid=4808980');
                        } else if (condition.temp < 0) {
                            convo.say("Kỉ băng hà ?");
                        } else convo.say("Thời tiết hôm nay ở " + location + " là " + condition.temp + data.query.results.channel.units.temperature);
                    });
                }
            });
            convo.say("Bản tin thời tiết tới đây là kết thúc, xin nhường chỗ cho các chương trình khác.");
            convo.end(); // trả về thông tin cho người dùng xong thì end conversation
        });
    });
}
