const detect = require('./detect');
const verify = require('./verify');

module.exports = (convo, intellibot) => {
    convo.ask({
        text: "Face - Cognitive services by Microsoft\n",
        quickReplies: ['Find similar', 'Group', 'Verify']
    }, (payload, convo) => {
        switch (payload.message.text) {
            case 'Detect':
                const det = (convo) => {
                    convo.ask("Detect age, gender & smile of the pic. Input 1 img with 1 person only (not yet supported multiple people)", (payload, convo) => {
                        if (payload.message.attachments && payload.message.attachments.length === 1) {
                            (async () => {
                                let answer = await detect(payload.message.attachments, true);
                                await convo.say("Tuoi: " + answer.age + ", Gioi tinh: " + answer.gender + ", Nu cuoi: ", + answer.smile + "%");
                                intellibot(convo);
                            })();
                        } else {
                            convo.say("???");
                            intellibot(convo);
                        }
                    });
                };
                det(convo);
                break;
            case 'Verify':
                const verify = (convo) => {
                    convo.ask("Detect whether 2 pics are identical. Input 2 imgs with 1 person only (not yet supported multiple people)", (payload, convo) => {
                        if (payload.message.attachments && payload.message.attachments.length === 2) {
                            verify(detect(payload.message.attachments, true), convo, intellibot);
                        } else {
                            convo.say("???");
                            intellibot(convo);
                        }
                    });
                };
                verify(convo);
                break;
        }
    })
};