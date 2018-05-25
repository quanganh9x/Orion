const schedule = require('node-schedule');


var j = schedule.scheduleJob(date, function(){
    console.log('The world is going to end today.');
});