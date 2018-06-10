const User = require('../../../models/user');
const weather = require('openweather-apis');

module.exports = (id, bot) => {
    User.findOne({id: id}, 'location', (err, result) => {
        if (err) console.log(err);
        else {
            weather.setLang('en');
            weather.setAPPID('781a4ff410c47f5131129f221c2dcc44');
            const locationInfo = result.location.split(",");
            weather.setCoordinate(locationInfo[0], locationInfo[1]);
            weather.setUnits('metric');
            weather.getAllWeather(function (err, body) {
                (async () => {
                    const tempC = body.main.temp;
                    const location = body.name;
                    const country = body.sys.country;
                    const pressure = body.main.pressure;
                    const humidity = body.main.humidity;
                    const wind = body.wind.speed;
                    const main = body.weather[0].main;
                    await bot.say(id, "Nhiệt độ ở [" + location + ", " + country + "] là " + tempC + "oC");
                    await bot.say(id, "Áp suất đạt mức " + pressure + "hPa. Độ ẩm " + humidity + "%. Mức gió " + wind + "mph");
                    switch (main) {
                        case "Rain":
                            await bot.say(id, "Đừng dại đưa ny đi chơi hnay nếu không muốn bị đá vì ướt mưa!");
                            break;
                        case "Thunderstorm":
                            await bot.say(id, "Thất tình tự tử đi mưa. Điện giật siêu tê đã sướng chưa ?");
                            break;
                        case "Drizzle":
                            await bot.say(id, "Nhớ mặc áo mưa trước khi vô nhà 🤭 các bạn nhỏ, nhé");
                            break;
                        case "Clear":
                            await bot.say(id, "Ui trời đẹp thế này mà không ở nhà thì phí quá :P"); // neet-san?
                            break;
                        case "Snow":
                            await bot.say(id, "o.O ... Đừng ăn tuyết nhé ..."); //imnotfunnyimsosorry // noprob,auntie :/
                            break;
                        case "Clouds":
                            await bot.say(id, "Buồn tàn mây ...");
                            break;
                        default:
                            await bot.say(id, "Thời tiết ôn hoà ~~"); // có ai nghĩ tới cảnh cô Trà đi lead chưa ?!
                            break;
                    }
                })();
            });
        }
    });
};