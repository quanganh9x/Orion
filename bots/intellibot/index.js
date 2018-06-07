const vision = require('./cognitive/google-vision');
const textanalytics = require('./cognitive/textanalytics');
const spellcheck = require('./cognitive/spellcheck');
const face = require('./cognitive/face/face');

module.exports = function (bot) {
    bot.hear(['intelli', 'ai'], (payload, chat) => {
        chat.conversation((convo) => {
            const preintellibot = (convo) => {
                convo.say({
                    text: "[IntelliBOT] v1.0. Your own AI accessing system",
                    quickReplies: ['Vision', 'Face', 'TextAnalytics', 'SpellChecking']
                });
                intellibot(convo);
            };
            const intellibot = (convo) => {
                convo.ask(() => {}, (payload, convo) => {
                    console.log(JSON.stringify(payload.message.attachments));
                    switch (payload.message.text) {
                        case 'Vision':
                            vision(convo, intellibot);
                            break;
                        case 'Face':
                            face(convo, intellibot);
                            break;
                        case 'TextAnalytics':
                            textanalytics(convo, intellibot);
                            break;
                        case 'SpellChecking':
                            spellcheck(convo, intellibot);
                            break;
                        case 'end':
                            convo.end();
                            break;
                        case 'whereami':
                            convo.say("Main > IntelliBOT");
                            intellibot(convo);
                            break;
                        default:
                            convo.say("????").then(() => preintellibot(convo));
                            break;
                    }
                });
            };
            preintellibot(convo);
        });
    });
};