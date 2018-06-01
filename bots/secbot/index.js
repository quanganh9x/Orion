const check = require('./check');
const router = require('./router');

module.exports = function (bot) {
    bot.hear(['security'], (payload, chat) => {
        chat.conversation((convo) => {
            const presecbot = (convo) => {
                convo.say({
                    text: "[SecBOT] v1.0. Luôn luôn bảo vệ bạn!",
                    quickReplies: ['Leaks', 'Router DNS']
                });
                secbot(convo);
            };
            const secbot = (convo) => {
                convo.ask(() => {}, (payload, convo) => {
                    switch (payload.message.text) {
                        case 'Leaks':
                            check(convo, secbot);
                            break;
                        case 'Router DNS':
                            router(convo, secbot);
                            break;
                        case 'end':
                            convo.end();
                            break;
                        case 'whereami':
                            convo.say("Main > SecBOT");
                            secbot(convo);
                            break;
                        default:
                            convo.say("????");
                            presecbot(convo);
                            break;
                    }
                });
            };
            presecbot(convo);
        });
    });
};