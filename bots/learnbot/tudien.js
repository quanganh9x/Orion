const av = require('./tudien/av');
const va = require('./tudien/va');

module.exports = (convo, learnbot) => {
    convo.ask({
        text: 'Chọn loại từ điển muốn tra ?',
        buttons: [
            {type: 'postback', title: 'A-V', payload: 'LEARN_AV'},
            {type: 'postback', title: 'V-A', payload: 'LEARN_VA'}
        ]
    }, (payload, convo) => {
        switch (payload.message.text) {
            case 'A-V':
                av(convo, learnbot);
                break;
            case 'V-A':
                va(convo, learnbot);
                break;
            default:
                convo.say("???");
                learnbot(convo);
                break;
        }
    });
};