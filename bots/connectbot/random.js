const Room = require('../../models/connectbot-rooms');
const User = require('../../models/user');
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
                        bot.conversation(result.uid1, (payload, convo) => {
                                convo.on('message', (payload, chat) => {
                                    switch (payload.message.text) {
                                        case 'end':
                                            convo.say("Bạn đã thoát khỏi phòng chat #" + result._id);
                                            convo.end();
                                            break;
                                        default:
                                            bot.say(result.uid2, payload.message.text);
                                            break;
                                    }
                                });
                        });
                        bot.conversation(result.uid2, (payload, convo) => {
                            convo.on('message', (payload) => {
                                switch (payload.message.text) {
                                    case 'end':
                                        convo.say("Bạn đã thoát khỏi phòng chat #" + result._id);
                                        convo.end();
                                        break;
                                    default:
                                        bot.say(result.uid1, payload.message.text);
                                        break;
                                }
                            });
                        });
                    })();
                }
            });
        });
    }
}