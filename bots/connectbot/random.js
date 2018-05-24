const Room = require('../../models/connectbot-rooms');
const User = require('../../models/user');
const factory = require('./randomFactory');
let randomQueue = [1760197560714501];

module.exports = (convo, bot) => {
    if (randomQueue.length === 0) {
        convo.getUserProfile().then((user) => {
            randomQueue.push(user.id);
        });
    } else if (randomQueue.length === 1) {
        convo.getUserProfile().then((user) => {
            new Room({
                uid1: user.id,
                uid2: randomQueue[0]
            }).save((err, result) => {
                if (err) console.log("err saving room: " + err);
                else {
                    (async () => {
                        await User.findOneAndUpdate({id: result.uid1}, {$set: {roomId: result._id}}, {"new": true}, (err, result) => {
                            if (err || !result) console.log("err "+ err);
                        });
                        await User.findOneAndUpdate({id: result.uid2}, {$set: {roomId: result._id}}, {"new": true}, (err, result) => {
                            if (err || !result) console.log("err "+ err);
                        });
                        randomQueue.length = await 0;
                        await factory(result.uid1, result.uid2, bot);
                        convo.end();
                    })();
                }
            });
        });
    }
}