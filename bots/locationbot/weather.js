const weather = require('openweather-apis');

module.exports = (lat, long, convo, locationbot) => {
    weather.setLang('en');
    weather.setAPPID('781a4ff410c47f5131129f221c2dcc44');
    weather.setCoordinate(lat, long);
    weather.setUnits('metric');
    weather.getAllWeather(function (err, body) {
        const tempC = body.main.temp;
        if (tempC > 100) {
            convo.say("Trái đất tiêu rùi");
            locationbot(convo);
        } else if (tempC < -40) {
            convo.say("Kỉ băng hà ?");
            locationbot(convo);
        } else {
            (async () => {
                const location = body.name;
                const country = body.sys.country;
                const pressure = body.main.pressure;
                const humidity = body.main.humidity;
                const wind = body.wind.speed;
                const main = body.weather[0].main;
                await convo.say("Nhiệt độ ở [" + location + ", " + country + "] là " + tempC + "oC");
                await convo.say("Áp suất đạt mức " + pressure + "hPa. Độ ẩm " + humidity + "%. Mức gió " + wind + "mph");
                switch (main) {
                    case "Rain":
                        await convo.say("Đừng dại đưa ny đi chơi hnay nếu không muốn bị đá vì ướt mưa!");
                        break;
                    case "Thunderstorm":
                        await convo.say("Thất tình tự tử đi mưa. Điện giật siêu tê đã sướng chưa ?");
                        break;
                    case "Drizzle":
                        await convo.say("Nhớ mặc áo mưa trước khi vô nhà 🤭 các bạn nhỏ, nhé");
                        break;
                    case "Clear":
                        await convo.say("Ui trời đẹp thế này mà không ở nhà thì phí quá :P"); // neet-san?
                        break;
                    case "Snow":
                        await convo.say("o.O ... Đừng ăn tuyết nhé ..."); //imnotfunnyimsosorry // noprob,auntie :/
                        break;
                    case "Clouds":
                        await convo.say("Buồn tàn mây ...");
                        break;
                    default:
                        await convo.say("Thời tiết ôn hoà ~~"); // có ai nghĩ tới cảnh cô Trà đi lead chưa ?!
                        break;
                }
                locationbot(convo);
            })();
        }
    });
};