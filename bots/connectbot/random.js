const Room = require('../../models/connectbot-rooms');
const User = require('../../models/user');
const factory = require('./randomFactory');
let randomQueue = [];

exports.start = (convo, bot) => {
    if (randomQueue.length === 0) {
        convo.getUserProfile().then((user) => {
            randomQueue.push(user.id);
            convo.say("Đã thêm bạn vào hàng chờ... Hãy chờ xíu nhé :D");
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
                        factory(result.uid1, result.uid2, bot);
                    })();
                }
            });
        });
    }
};

exports.optout = (convo) => {
    convo.getUserProfile().then((user) => {
        User.findOne({id: user.id}, (err, result) => {
            if (err || !result) console.log("err connectbot: " + err);
            if (result) {
                if (result.roomId) convo.say("Bạn đã tham gia chat! Hãy dùng lệnh thoát phòng trước");
                else {
                    if (randomQueue.includes(result.id)) randomQueue.length = 0;
                    convo.say("Bạn đã thoát khỏi hàng chờ").then(() => {
                        convo.end();
                    });
                }
            }
        });
    })
};