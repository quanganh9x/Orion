const tin = require('./tin');
const bongda = require('./sports/bongda');

module.exports = function (bot) {
    bot.hear(['news'], (payload, chat) => {
        chat.conversation((convo) => {
            const prenewsbot = (convo) => {
                convo.say({
                    text: "[NewsBOT] v2.0 xin chào mừng! Bạn muốn tìm thể loại tin tức nào ?",
                    quickReplies: ['Tin mới', 'Thể thao', 'Đăng ký bản tin']
                });
                newsbot(convo);
            };
            const newsbot = (convo) => {
                convo.ask(() => {}, (payload, convo) => {
                    switch (payload.message.text) {
                        case 'Tin mới':
                            convo.ask({
                                text: "Lấy tin của 1 trong các báo sau",
                                quickReplies: ['VNExpress', 'TinMoi', '24H', 'K14', 'Tự chọn']
                            }, (payload, convo) => {
                                tin(payload.message.text, convo, newsbot, false);
                            });
                            break;
                        case 'Đọc thêm':
                            if (convo.get('pinpoint')) tin(convo.get('pinpoint'), convo, newsbot, true);
                            else prenewsbot(convo);
                            break;
                        case 'Thể thao':
                            convo.ask({
                                text: "Môn thể thao bạn muốn biết tin tức ?",
                                quickReplies: ['Bóng đá']
                            }, (payload, convo) => {
                                switch (payload.message.text) {
                                    case 'Bóng đá':
                                        convo.ask({
                                            text: "Chọn một trong các tuỳ chọn sau:",
                                            quickReplies: ['Lịch thi đấu tuần', 'Kết quả theo tuần', 'Top 4']
                                        }, (payload, convo) => {
                                            convo.set('type', payload.message.text);
                                            convo.ask({
                                                text: "Giải đấu bạn mong muốn ?",
                                                quickReplies: ['EPL', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1']
                                            }, (payload, convo) => {
                                                bongda(convo.get('type'), payload.message.text, convo, newsbot);
                                            });
                                        });
                                        break;
                                    default:
                                        convo.say("???");
                                        prenewsbot(convo);
                                        break;
                                }
                            });
                            break;
                        case 'Gaming':
                            break;
                        case 'Đăng ký bản tin':
                            break;
                        case 'whereami':
                            convo.say("Main > NewsBOT");
                            newsbot(convo);
                            break;
                        case 'end':
                            convo.end();
                            break;
                        default:
                            prenewsbot(convo);
                            break;
                    }
                });
            };
            prenewsbot(convo);
        });
    });
};