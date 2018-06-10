const money = require('./money');
const unit = require('./unit');
const extension = require('./extension');
const shorten = require('./shorten');

module.exports = function (bot) {
    bot.hear(['converter'], (payload, chat) => {
        chat.conversation((convo) => {
            const preconverterbot = (convo) => {
                convo.say({
                    text: "[ConverterBOT] v1.0. Xử lý số liệu nhanh gọn lẹ",
                    quickReplies: ['Đổi unit', 'Đổi $', 'Đổi định dạng file', 'Rút gọn URL']
                });
                converterbot(convo);
            };
            const converterbot = (convo) => {
                convo.ask(() => { }, (payload, convo) => {
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
                        case 'Rút gọn URL':
                            shorten(convo, converterbot);
                            break;
                        case 'end':
                        case 'End':
                            convo.say("Bạn đã thoát khỏi tính năng");
                            convo.end();
                            break;
                        case 'whereami':
                        case 'Whereami':
                        case 'Wai':
                            convo.say("Main > ConverterBOT");
                            converterbot(convo);
                            break;
                        default:
                            convo.say("Sai cú pháp :(").then(() => preconverterbot(convo));
                            break;
                    }
                });
            };
            preconverterbot(convo);
        });
    });
};