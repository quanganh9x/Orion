const schedule = require('node-schedule');
const fireCron = require('./fireCron');
const Group = require('../../models/group');
const Event = require('../../models/event');

module.exports = (bot) => {
    (async () => {
        Event.find({type: 2}, ['cron', 'job', 'subscribers'], (err, events) => {
            if (err) console.log("cron failed to start: " + err);
            if (events.length > 0) {
                fireCron.prepare(bot);
                for (let i = 0; i < events.length; i++) {
                    fireCron.fire(events[i]);
                }
            } else console.log("no cron event");
        });
    })();
};