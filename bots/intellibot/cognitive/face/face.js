const detect = require('./detect');
const verify = require('./verify');

module.exports = (convo, intellibot) => {
    convo.ask({
        text: "Face - Cognitive services by Microsoft\n",
        quickReplies: ['Detect', 'Verify']
    }, (payload, convo) => {
        switch (payload.message.text) {
            case 'Detect':
                    convo.ask("Phát hiện tuổi, giới tính & nụ cười của bức ảnh. Gửi lên 1 bức ảnh chỉ có 1 người trong đó (chưa hỗ trợ ảnh có nhiều người)", (payload, convo) => {
                        if (payload.message.attachments && payload.message.attachments.length === 1) {
                            detect(payload.message.attachments, true, convo, intellibot);
                        } else {
                            convo.say("???");
                            intellibot(convo);
                        }
                    });
                break;
            case 'Verify':
                    convo.ask("Kiểm tra nếu 2 bức ảnh có giống hệt nhau. Gửi lên 2 bức ảnh chỉ có 1 người trong đó (chưa hỗ trợ ảnh có nhiều người)", (payload, convo) => {
                        if (payload.message.attachments && payload.message.attachments.length === 2) {
                            verify(detect(payload.message.attachments, false, convo), convo, intellibot);
                        } else {
                            convo.say("???");
                            intellibot(convo);
                        }
                    });
                break;
        }
    })
};