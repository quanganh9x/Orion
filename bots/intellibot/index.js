const vision = require('./cognitive/google-vision');
const textanalytics = require('./cognitive/textanalytics');
const spellcheck = require('./cognitive/spellcheck');
const compvision = require('./cognitive/computer-vision');
const speech = require('./cognitive/speech');
const face = require('./cognitive/face');

module.exports = function (bot) {
    bot.hear(['intelli', 'ai'], (payload, chat) => {
        chat.conversation((convo) => {
            convo.say({
                text: "[IntelliBOT] v1.0. Your own AI accessing system",
                quickReplies: ['Vision', 'Computer Vision', 'Face', 'TextAnalytics', 'SpellChecking', 'SpeechRecognition']
            });
                const intellibot = (convo) => {
                    convo.ask(() => {}, (payload, convo) => {
                        switch (payload.message.text) {
                            case 'Vision':
                                vision(convo, intellibot);
                                break;
                            case 'Computer Vision':
                                compvision(convo, intellibot);
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
                            case 'SpeechRecognition':
                                speech(convo, intellibot);
                                break;
                            case 'end':
                                convo.end();
                                break;
                            case 'whereami':
                                convo.say("Main > IntelliBOT");
                                intellibot(convo);
                                break;
                            default:
                                convo.say("????");
                                intellibot(convo);
                                break;
                        }
                    });
                };
                intellibot(convo);
        });
    });
};