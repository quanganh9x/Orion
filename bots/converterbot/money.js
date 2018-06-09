const money = require('./money/money');

module.exports = (convo, converterbot) => {
    convo.ask("Bạn muốn đổi bao nhiêu ?", (payload, convo) => {
        convo.set("num", payload.message.text);
        convo.say({
            text: "Nhập mã tiền tệ để đổi (thường có 3 chữ). Dưới đây là một số gợi ý...",
            quickReplies: ['USD', 'VND', 'JPY', 'EUR','AUD', 'CNY', 'THB', 'KRW', 'SGD', 'HKD']
        });
        convo.ask("Bạn muốn đổi từ (nếu bạn đã nhập mã tiền tệ trước đó, nhập null) ?", (payload, convo) => {
            if (payload.message.text.length !== 3 || payload.message.text === "null") convo.set("from", undefined);
            else convo.set("from", payload.message.text);
            convo.ask("... sang ?", (payload, convo) => {
                (async () => {
                    await convo.set("to", payload.message.text);
                    money(convo.get('from'), convo.get('to'), convo.get('num'), convo, converterbot);
                })();
            })
        });
    });
};