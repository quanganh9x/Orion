const detect = require('./detect');
const verify = require('./verify');

module.exports = (convo, intellibot) => {
    convo.ask({
        text: "Face - Cognitive services by Microsoft\n",
        quickReplies: ['Detect', 'Verify']
    }, (payload, convo) => {
        switch (payload.message.text) {
            case 'Detect':
                    convo.ask("Detect age, gender & smile of the pic. Input 1 img with 1 person only (not yet supported multiple people)", (payload, convo) => {
                        if (payload.message.attachments && payload.message.attachments.length === 1) {
                            (async () => {
                                detect(payload.message.attachments, true, convo, intellibot);
                            })();
                        } else {
                            convo.say("???");
                            intellibot(convo);
                        }
                    });
                break;
            case 'Verify':
                    convo.ask("Detect whether 2 pics are identical. Input 2 imgs with 1 person only (not yet supported multiple people)", (payload, convo) => {
                        if (payload.message.attachments && payload.message.attachments.length === 2) {
                            verify(detect(payload.message.attachments, true), convo, intellibot);
                        } else {
                            convo.say("???");
                            intellibot(convo);
                        }
                    });
                break;
        }
    })
};