const check = require('./check');
const router = require('./router');

module.exports = function (bot) {
    bot.hear(['security', 'sec'], (payload, chat) => {
        chat.conversation((convo) => {
            const presecbot = (convo) => {
                convo.say({
                    text: "[SecBOT] v1.0. Luôn luôn bảo vệ bạn!",
                    quickReplies: ['Leaks', 'Router DNS']
                });
                secbot(convo);
            };
            const secbot = (convo) => {
                convo.ask(() => { }, (payload, convo) => {
                    switch (payload.message.text) {
                        case 'Leaks':
                            check(convo, secbot);
                            break;
                        case 'Router DNS':
                            router(convo, secbot);
                            break;
                        case 'end':
                        case 'End':
                            convo.say("Bạn đã thoát khỏi tính năng");
                            convo.end();
                            break;
                        case 'whereami':
                        case 'Whereami':
                        case 'Wai':
                            convo.say("Main > SecBOT").then(() => presecbot(convo));
                            break;
                        default:
                            convo.say("Không có tuỳ chọn này :( ").then(() =>  presecbot(convo));
                            break;
                    }
                });
            };
            presecbot(convo);
        });
    });
};