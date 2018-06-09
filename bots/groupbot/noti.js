const Group = require('../../models/group');

module.exports = (convo, groupbot, bot) => {
    convo.getUserProfile().then(user => {
        convo.ask("Gửi thông báo tới nhóm của bạn ?", (payload, convo) => {
            convo.set('noti', payload.message.text);
            Group.findOne({admin: user.id}, (err, result) => {
                const users = result.id;
                for (let i = 0; i < users.length; i++) {
                    bot.say(users[i], convo.get('noti'));
                }
            })
        })
    });
};