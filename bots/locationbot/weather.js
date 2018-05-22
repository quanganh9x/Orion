const WEATHER_API = 'https://api.openweathermap.org/data/2.5/weather?';
const request = require('request');

module.exports = (lat, long, convo) => {
    request(WEATHER_API + "lat=" + lat + "&lon=" + long + "&APPID=781a4ff410c47f5131129f221c2dcc44", function (error, response, body) {
        if (response.statusCode !== 200) {
            console.log('Lỗi??? ' + response.status);
            return;
        } else {
            body = JSON.parse(body);
            var location = body.name;
            var pressure = Math.ceil(body.main.pressure);
            var humidity = Math.ceil(body.main.humidity);
            var tempC = Math.ceil(body.main.temp - 273);
            var wMain = body.weather[0].main;
            if (tempC > 100) {
                convo.say("Trái đất tiêu rùi");
                convo.sendAttachment('image', 'https://media1.tenor.com/images/71b3af3541f226215a579fb96386fc35/tenor.gif?itemid=4808980');
            } else if (tempC < -40) {
                convo.say("Kỉ băng hà ?");
            } else {
                convo.say("Thời tiết bây giờ ở [" + location + ", "+ body.sys.country+ "] là " + tempC + "oC").then(() => {
                    convo.say("Áp suất đạt mức " + pressure + "atm. Độ ẩm " + humidity + "%. Mức gió " + Math.ceil(body.wind.speed) + "miles/hr");
                });
            }
            switch (wMain) {
                case "Rain":
                    convo.say("Fun fact: Hạt mưa thường bay dưới 1 góc hướng vào người bạn. Đừng dại đưa ny đi chơi hnay nếu không muốn bị đá");
                    break;
                case "Thunderstorm":
                    convo.say("Thất tình tự tử đi mưa. Điện giật siêu tê đã sướng chưa ?");
                    break;
                case "Drizzle":
                    convo.say("Nhớ mặc áo mưa trước khi vô nhà 🤭 các bạn nhỏ, nhé"); // -_- đeo, không phải mặc :P
                    break;
                case "Clear":
                    convo.say("Ui trời đẹp thế này mà không ở nhà thì phí quá :p"); // neet-san?
                    break;
                case "Snow":
                    convo.say("o.O ... Đừng ăn tuyết nhé ..."); //imnotfunnyimsosorry // noprob,auntie :/
                    break;
                case "Clouds":
                    convo.say("Mây mưa vừa hợp tình, vừa hợp lý trong trường hợp này :))");
                    break;
                default:
                    convo.say("Đeo khẩu trang và kính râm mọi lúc mọi nơi, như chị này nè"); // có ai nghĩ tới cảnh cô Trà đi lead chưa ?!
                    convo.sendAttachment('image', 'http://sohanews.sohacdn.com/thumb_w/660/2016/adcc7288d693418599dfd291cad61400-1482982069105-0-0-310-500-crop-1482982103995.jpg');
                    break;
            }
            convo.end();
        }
    });
};