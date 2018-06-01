const aa = require('./tudien/aa');
const av = require('./tudien/av');
const va = require('./tudien/va');

module.exports = (convo, learnbot) => {
    convo.ask({
        text: 'Chọn loại từ điển muốn tra ?',
        buttons: [
            {type: 'postback', title: 'A-V', payload: 'LEARN_AV'},
            {type: 'postback', title: 'V-A', payload: 'LEARN_VA'},
            {type: 'postback', title: 'A-A', payload: 'LEARN_AA'}
        ]
    }, (payload, convo) => {
        switch (payload.message.text) {
            case 'A-V':
                av(convo, learnbot);
                break;
            case 'V-A':
                va(convo, learnbot);
                break;
            case 'A-A':
                aa(convo, learnbot);
                break;
            default:
                convo.say("???").then(() => {
                    learnbot(convo);
                });
                break;
        }
    });
};