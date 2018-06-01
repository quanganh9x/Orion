const tudien = require('./tudien');
const ask = require('./ask');

module.exports = function (bot) {
    bot.hear(['learn'], (payload, chat) => {
        chat.conversation((convo) => {
                convo.say({
                    text: "[LearnBOT] v1.0. Bạn muốn biết gì nè?",
                    quickReplies: ['Từ điển', 'Bách khoa toàn thư']
                }).then(() => {
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
                                    convo.end();
                                    break;
                                case 'whereami':
                                    convo.say("Main > LearnBOT");
                                    learnbot(convo);
                                    break;
                                default:
                                    convo.say("????");
                                    learnbot(convo);
                                    break;
                            }
                        });
                    };
                    learnbot(convo);
                });
        });
    });
};