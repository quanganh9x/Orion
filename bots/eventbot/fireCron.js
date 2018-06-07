const schedule = require('node-schedule');

const moneybase = require('../converterbot/money/money-base');
const dailyNews = require('./jobs/news');
const remove = require('./jobs/core/removeTemp');

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
// core daemons ////
Handler.prototype.updateMoneyBase = () => {
    moneybase.setRates();
};

Handler.prototype.removeTempFiles = () => {
    remove();
};
////////////////////

Handler.prototype.sendNewsDaily = (subscribers) => {
    if (subscribers !== undefined)
    for (let i = 0; i < subscribers.length; i++) {
        dailyNews(subscribers[i], this.bot);
    }
    else console.log("0 subscribers. Ignored event");
};