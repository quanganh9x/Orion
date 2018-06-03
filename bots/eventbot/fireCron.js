const schedule = require('node-schedule');
const findRemoveSync = require('find-remove');
const moneybase = require('../converterbot/money/money-base');

const scheduledCrons = [];
const functions = new Handler();

const prepare = (bot) => {
    functions.set(bot);
};

const fire = (event) => {
    if (event.subscribers.length !== 0) scheduledCrons.push(schedule.scheduleJob(event.cron, () => functions[event.job](event.subscribers)));
    else scheduledCrons.push(schedule.scheduleJob(event.cron, () => functions[event.job]()));
    console.log("[schedule] scheduled event: " + event.job);
};

const destroyJob = (item, isNumber) => {
    if (isNumber) scheduledCrons[item].cancel();
    else scheduledCrons[scheduledCrons.indexOf(item)].cancel();
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

Handler.prototype.removeTempQRFiles = () => {
    if (findRemoveSync(process.env.HOME_DIR + "/public/uploads/images/qr", {age: {seconds: 3600}})) console.log("removeTempQRs exec-ed successfully: " + new Date(Date.now()).toISOString());
};
