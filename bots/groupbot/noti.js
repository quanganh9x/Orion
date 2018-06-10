const Group = require('../../models/group');

module.exports = (convo, groupbot, bot) => {
    convo.getUserProfile().then(user => {
        convo.ask("Gửi thông báo tới nhóm của bạn ?", (payload, convo) => {
            convo.set('noti', payload.message.text);
            Group.findOne({admin: user.id}, (err, result) => {
                if (result) {
                    const users = result.id;
                    for (let i = 0; i < users.length; i++) {
                        bot.say(users[i], convo.get('noti'));
                        if (i === users.length - 1) convo.say("Hoàn tất!").then(() => groupbot(convo));
                    }
                } else convo.say("Bạn chưa đăng ký là Business User!").then(() => groupbot(convo));
            })
        })
    });
};