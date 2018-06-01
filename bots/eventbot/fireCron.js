const schedule = require('node-schedule');
const moneybase = require('../converterbot/money/money-base');

const scheduledCrons = [];
const functions = new Handler();

const prepare = (bot) => {
    functions.set(bot);
};

const fire = (event) => {
    if (event.subscribers.length !== 0) scheduledCrons.push(schedule.scheduleJob(event.cron, () => functions[event.job](event.subscribers)));
    else scheduledCrons.push(schedule.scheduleJob(event.cron, () => functions[event.job]()));
};

const destroyJob = (item, isNumber) => {
    scheduledCrons[item].cancel();
};

module.exports = {
    prepare,
    fire,
    destroyJob
};

function Handler() {
}

Handler.prototype.set = (bot) => {
    this.bot = bot;
};

Handler.prototype.test = (subscribers) => {
    this.bot.say(subscribers[0], "Schedule");
};

Handler.prototype.updateMoneyBase = () => {
    moneybase.setRates();
};

