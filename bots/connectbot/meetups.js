const Room = require('../../models/room');
const User = require('../../models/user');
const factory = require('./Factory');
let maleQueue = [];
let femaleQueue = [];

exports.start = (convo, bot) => {
        convo.getUserProfile().then((user) => {
            if (user.gender === "male") {
                if (femaleQueue.length === 0) maleQueue.push(user.id);
                else {
                    new Room({
                        type: 'meetups',
                        uid1: user.id,
                        uid2: femaleQueue[0]
                    }).save((err, result) => {
                        if (err) console.log("err saving room: " + err);
                        else {
                            (async () => {
                                await User.findOneAndUpdate({id: result.uid1}, {$set: {roomId: result._id}}, {new: true}, (err, result) => {
                                    if (err || !result) console.log("err "+ err);
                                });
                                await User.findOneAndUpdate({id: result.uid2}, {$set: {roomId: result._id}}, {new: true}, (err, result) => {
                                    if (err || !result) console.log("err "+ err);
                                });
                                femaleQueue.splice(0, 1);
                                factory(result.uid1, result.uid2, bot);
                            })();
                        }
                    });
                }
            }
            else if (user.gender === "female") {
                if (maleQueue.length === 0) femaleQueue.push(user.id);
                else {
                    new Room({
                        type: 'meetups',
                        uid1: user.id,
                        uid2: maleQueue[0]
                    }).save((err, result) => {
                        if (err) console.log("err saving room: " + err);
                        else {
                            (async () => {
                                await User.findOneAndUpdate({id: result.uid1}, {$set: {roomId: result._id}}, {new: true}, (err, result) => {
                                    if (err || !result) console.log("err "+ err);
                                });
                                await User.findOneAndUpdate({id: result.uid2}, {$set: {roomId: result._id}}, {new: true}, (err, result) => {
                                    if (err || !result) console.log("err "+ err);
                                });
                                maleQueue.splice(0, 1);
                                factory(result.uid1, result.uid2, bot);
                            })();
                        }
                    });
                }
            }
            else convo.say("Tùy chọn không khả dụng cho tài khoản không khả dụng giới tính :(");
        });
};

exports.optout = (convo) => {
    convo.getUserProfile().then((user) => {
        User.findOne({id: user.id}, (err, result) => {
            if (err || !result) console.log("err connectbot: " + err);
            if (result) {
                if (result.roomId) convo.say("Bạn đã tham gia chat! Hãy dùng lệnh thoát phòng trước");
                else {
                    if (maleQueue.includes(result.id)) maleQueue.splice(maleQueue.indexOf(result.id), 1);
                    else if (femaleQueue.includes(result.id)) femaleQueue.splice(femaleQueue.indexOf(result.id), 1);
                    convo.say("Bạn đã thoát khỏi hàng chờ").then(() => {
                        convo.end();
                    });
                }
            }
        });
    })
};