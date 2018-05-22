
const request = require('request');
const weather = require('./weather');

/////////////////////////////// Thời tiết bot ////////////////////////////
module.exports = function (bot) {
    bot.hear(['thời tiết'], (payload, chat) => {
        chat.conversation((convo) => {
            convo.ask({
                text: "Bạn ở đâu thế (gửi vị trí lên để mình dự báo nghen) - từ Thầy bói",
                quickReplies: {
                    content_type: "location"
                }
            }, (payload, convo) => {
                if (payload.message.attachments[0].payload.coordinates !== undefined) {
                    weather(payload.message.attachments[0].payload.coordinates.lat, payload.message.attachments[0].payload.coordinates.long, convo);
                } else {
                    chat.say("Vui lòng sử dụng tính năng gửi vị trí của messenger").then(() => {
                        convo.end();
                    });
                }
            });
        });
    });
}
