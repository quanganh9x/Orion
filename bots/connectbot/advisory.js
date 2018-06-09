const Room = require('../../models/room');
const User = require('../../models/user');
const factory = require('./Factory');

exports.start = (convo, bot, connectbot) => {
    User.find({privilege: 1, roomId: null}, ['first_name', 'last_name', 'id'], (err, result) => {
        if (err) {
            console.log(err);
            connectbot(convo);
        }
        if (!result || result.length === 0) convo.say("Không có tư vấn viên nào rảnh tay lúc này. Bạn vui lòng quay lại sau").then(() => connectbot(convo));
        if (result && result.length !== 0) {
            let advisories = [];
            for (let i = 0; i < result.length; i++) {
                let name = result[i].first_name + " " + result[i].last_name;
                advisories.push({type: 'postback', title: name, payload: result[i].id});
                if (i === result.length - 1) convo.say({
                    text: "Đây là danh sách các tư vấn viên chúng tôi gợi ý cho bạn!",
                    buttons: advisories
                }).then(() => connectbot(convo));
            }
        }
    });
};

exports.trigger = (id, convo) => {
    convo.getUserProfile().then((user) => {
        new Room({
            type: 'advisory',
            uid1: user.id,
            uid2: id
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
                    factory(result.uid1, result.uid2, bot);
                    convo.end();
                })();
            }
        });
    });
};