const money = require('money');
const moneybase = require('./money-base');

module.exports = (from, to, num, convo, converterbot) => {
    (async () => {
        await moneybase.getRates(money);
        if (from == undefined) {
            await convo.say(num + " tương ứng " + money(num).to(to) + to + " nhé~");
        } else await convo.say(num + from + " tương ứng " + money(parseInt(num)).from(from).to(to) + to + " nhé~");
        converterbot(convo);
    })();

};