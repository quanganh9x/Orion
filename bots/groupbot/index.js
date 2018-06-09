const Group = require('../../models/group');
const noti = require('./noti');

module.exports = function (bot) {
    bot.hear(['group', 'business'], (payload, chat) => {
        chat.conversation((convo) => {
            const pregroupbot = (convo) => {
                convo.say({
                    text: "[GroupBOT] v1.0. Manage & Interact with your groups - Tính năng Business",
                    quickReplies: ['Group Notification', 'Group List', 'Create Group']
                });
                groupbot(convo);
            };
            const groupbot = (convo) => {
                convo.ask(() => { }, (payload, convo) => {
                    switch (payload.message.text) {
                        case 'Group Notification':
                            noti(convo, groupbot, bot);
                            break;
                        case 'Group List':
                            convo.getUserProfile().then(user => {
                                Group.findOne({admin: user.id}, (err, result) => {
                                    if (err || !result) convo.say("Bạn không có nhóm. Nếu là Business User hãy liên hệ admin để tạo nhóm").then(() => groupbot(convo));
                                    else convo.say("Bạn đang quản lý nhóm có ID: " + result.gid + ", gồm các người dùng: " + result.id).then(() => groupbot(convo));
                                });
                            });
                            break;
                        case 'Create Group':
                            convo.say("Bạn cần liên hệ với admin để tạo & quản lý nhóm").then(() => pregroupbot(convo));
                            break;
                        case 'End':
                        case 'end':
                            convo.say("Bạn đã về Main");
                            convo.end();
                            break;
                        case 'whereami':
                        case 'Whereami':
                        case 'Wai':
                            convo.say("Main > GroupBOT").then(() => pregroupbot(convo));
                            break;
                        default:
                            convo.say("Tuỳ chọn không khả dụng").then(() => pregroupbot(convo));
                            break;
                    }
                });
            };
            pregroupbot(convo);
        });
    });
};