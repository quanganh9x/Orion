const weather = require('openweather-apis');

module.exports = (lat, long, convo) => {
    weather.setLang('en');
    weather.setAPPID('781a4ff410c47f5131129f221c2dcc44');
    weather.setCoordinate(lat, long);
    weather.setUnits('metric');
    weather.getAllWeather(function (err, body) {
        const location = body.name;
        const country = body.sys.country;
        const pressure = body.main.pressure;
        const humidity = body.main.humidity;
        const wind = body.wind.speed;
        const tempC = body.main.temp;
        const main = body.weather[0].main;
        if (tempC > 100) {
            convo.say("Trái đất tiêu rùi");
            convo.sendAttachment('image', 'https://media1.tenor.com/images/71b3af3541f226215a579fb96386fc35/tenor.gif?itemid=4808980');
        } else if (tempC < -40) {
            convo.say("Kỉ băng hà ?");
        } else {
            (async () => {
                await convo.say("Nhiệt độ ở [" + location + ", " + country + "] là " + tempC + "oC");
                await convo.say("Áp suất đạt mức " + pressure + "hPa. Độ ẩm " + humidity + "%. Mức gió " + wind + "mph");
                switch (main) {
                    case "Rain":
                        convo.say("Đừng dại đưa ny đi chơi hnay nếu không muốn bị đá vì ướt mưa!");
                        break;
                    case "Thunderstorm":
                        convo.say("Thất tình tự tử đi mưa. Điện giật siêu tê đã sướng chưa ?");
                        break;
                    case "Drizzle":
                        convo.say("Nhớ mặc áo mưa trước khi vô nhà 🤭 các bạn nhỏ, nhé");
                        break;
                    case "Clear":
                        convo.say("Ui trời đẹp thế này mà không ở nhà thì phí quá :P"); // neet-san?
                        break;
                    case "Snow":
                        convo.say("o.O ... Đừng ăn tuyết nhé ..."); //imnotfunnyimsosorry // noprob,auntie :/
                        break;
                    case "Clouds":
                        convo.say("Buồn tàn mây ...");
                        break;
                    default:
                        convo.say("Đeo khẩu trang và kính râm mọi lúc mọi nơi, như chị này nè"); // có ai nghĩ tới cảnh cô Trà đi lead chưa ?!
                        convo.sendAttachment('image', 'http://sohanews.sohacdn.com/thumb_w/660/2016/adcc7288d693418599dfd291cad61400-1482982069105-0-0-310-500-crop-1482982103995.jpg');
                        break;
                }
            })();
        }
    });
};