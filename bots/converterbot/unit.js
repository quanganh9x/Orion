const convert = require('convert-units');

module.exports = (convo, converterbot) => {
    convo.ask({
        text: "Bạn muốn đổi loại nào?",
        buttons: [
            {type: 'postback', title: 'Độ dài', 'payload': 'length'},
            {type: 'postback', title: 'Cân nặng', 'payload': 'mass'},
            {type: 'postback', title: 'Độ dài', 'payload': 'volume'},
        ]
    }, (payload, convo) => {
        if (payload.message.event && (payload.message.event === 'length' || 'mass' || 'volume'))
        convo.ask({
            text: "Đơn vị đổi từ... ?",
            quickReplies: (convert().possibilities(payload.message.event).length > 11 ? convert().possibilities(payload.message.event).slice(0,11) : convert().possibilities(payload.message.event))
        }, (payload, convo) => {
            (async () => {
                await convo.set("from", payload.message.text);
                convo.ask({
                    text: "...sang ?",
                    quickReplies: (convert().from(convo.get('from')).possibilities().length > 11 ? convert().from(convo.get('from')).possibilities().slice(0,11) : convert().from(convo.get('from')).possibilities())
                }, (payload, convo) => {
                    convo.set("to", payload.message.text);
                    convo.ask("Bao nhiêu ?", (payload, convo) => {
                        if (!isNaN(payload.message.text)) {
                            convo.say("Ok: " + parseInt(payload.message.text) + convo.get('from') + " = " + convert(parseInt(num)).from(convo.get('from')).to(convo.get('to')) + convo.get('to')).then(() => converterbot(convo));
                        } else convo.say("Nhập liệu không đúng!").then(() => converterbot(convo));
                    });
                });
            })();
        })

    });
};