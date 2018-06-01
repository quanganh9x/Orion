const request = require('request');
let info = {
    base: "USD"
};

const getRates = (money) => {
    money.base = info.base;
    money.rates = info.rates;
};

const setRates = () => {
    request("https://openexchangerates.org/api/latest.json?app_id=" + process.env.OPEN_EXCHANGE_APIKEY, (err, response, body) => {
        if (response &&  response.statusCode === 200) {
            body = JSON.parse(body);
            info.base = body.base;
            info.rates = body.rates;
            console.log("setRates successfully: " + new Date(Date.now()).toLocaleString('vi-VN'));
        }
    });
};

module.exports = {
    getRates,
    setRates
};