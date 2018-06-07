const tudien = require('./tudien');
const ask = require('./ask');

module.exports = function (bot) {
    bot.hear(['learn'], (payload, chat) => {
        chat.conversation((convo) => {
            const prelearnbot = (convo) => {
                convo.say({
                    text: "[LearnBOT] v1.0. Bạn muốn biết gì nè?",
                    quickReplies: ['Từ điển', 'Bách khoa toàn thư']
                });
                learnbot(convo);
            };
            const learnbot = (convo) => {
                convo.ask(() => {}, (payload, convo) => {
                    switch (payload.message.text) {
                        case 'Từ điển':
                            tudien(convo, learnbot);
                            break;
                        case 'Bách khoa toàn thư':
                            ask(convo, learnbot);
                            break;
                        case 'end':
                        case 'End':
                            convo.end();
                            break;
                        case 'whereami':
                        case 'Whereami':
                        case 'Wai':
                            convo.say("Main > LearnBOT");
                            learnbot(convo);
                            break;
                        default:
                            convo.say("????");
                            prelearnbot(convo);
                            break;
                    }
                });
            };
            prelearnbot(convo);
        });
    });
};