const money = require('./money/money');
const unit = require('./unit');
const extension = require('./extension');

module.exports = function (bot) {
    bot.hear(['converter'], (payload, chat) => {
        chat.conversation((convo) => {
            const preconverterbot = (convo) => {
                convo.say({
                    text: "[ConverterBOT] v1.0. Xử lý số liệu nhanh gọn lẹ",
                    quickReplies: ['Đổi unit', 'Đổi $', 'Đổi định dạng file', 'File mirror']
                });
                converterbot(convo);
            };
            const converterbot = (convo) => {
                convo.ask(() => {}, (payload, convo) => {
                    switch (payload.message.text) {
                        case 'Đổi unit':
                            unit(convo, converterbot);
                            break;
                        case 'Đổi $':
                            money(convo, converterbot);
                            break;
                        case 'Đổi định dạng file':
                            extension(convo, converterbot);
                            break;
                        case 'File mirror':
                            upload(convo, converterbot);
                            break;
                        case 'end':
                            convo.end();
                            break;
                        case 'whereami':
                            convo.say("Main > ConverterBOT");
                            converterbot(convo);
                            break;
                        default:
                            convo.say("????");
                            preconverterbot(convo);
                            break;
                    }
                });
            };
            preconverterbot(convo);
        });
    });
};