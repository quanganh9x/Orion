const Event = require('../../models/event');

module.exports = (convo, newsbot) => {
    convo.ask({
        text: "Chọn bản tin bạn muốn đăng ký thông báo ?",
        quickReplies: ['Tin hay daily', 'Biến động tiền tệ']
    }, (payload, convo) => {
        switch (payload.message.text) {
            case 'Tin hay daily':
                convo.ask({
                    text: "Chọn thời gian trả tin về:",
                    buttons: [
                        {type: 'postback', title: '6h/lần từ 6h sáng', payload: 'EB_1'},
                        {type: 'postback', title: '4h/lần từ 6h sáng', payload: 'EB_3'},
                        {type: 'postback', title: '6h sáng & tối', payload: 'EB_2'}
                    ]
                }, (payload, convo) => {
                    switch (payload.message.event) {
                        case 'EB_1':
                            convo.getUserProfile().then(user => {
                                register(3, user.id).then(() => convo.say("Thành công").then(newsbot(convo)));
                            });
                            break;
                        case 'EB_2':
                            convo.getUserProfile().then(user => {
                                register(4, user.id).then(() => convo.say("Thành công").then(newsbot(convo)));
                            });
                            break;
                        case 'EB_3':
                            convo.getUserProfile().then(user => {
                                register(5, user.id).then(() => convo.say("Thành công").then(newsbot(convo)));
                            });
                            break;
                        default:
                            convo.say("???");
                            newsbot(convo);
                            break;
                    }
                });
                break;
            default:
                convo.say("Không có tuỳ chọn này :(").then(() => newsbot(convo));
                break;
        }
    });
};

function register(idEvent, id) {
    return new Promise((resolve, reject) => {
            Event.findOne({id: idEvent}, 'subscribers', (err, result) => {
                result.subscribers.push(id);
                Event.findOneAndUpdate({id: idEvent}, {$set: {subscribers: result.subscribers}}, {new: true}, (err, res) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        });
}