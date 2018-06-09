const detect = require('./detect');

module.exports = (convo, intellibot) => {
    convo.ask("Phát hiện tuổi, giới tính & nụ cười của bức ảnh. Gửi lên 1 bức ảnh", (payload, convo) => {
        if (payload.message.attachments && payload.message.attachments.length === 1) {
            detect(payload.message.attachments, true, convo, intellibot);
        } else {
            convo.say("Không hợp lệ :(").then(() => intellibot(convo));
        }
    });
};