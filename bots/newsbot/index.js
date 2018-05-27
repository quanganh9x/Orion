const tin = require('./tin');
const bongda = require('./sports/bongda');

module.exports = function (bot) {
    bot.hear(['news'], (payload, chat) => {
        chat.conversation((convo) => {
            convo.say({
                text: "[NewsBOT] v2.0 xin chào mừng! Bạn muốn tìm thể loại tin tức nào ?",
                quickReplies: ['Tin mới', 'Thể thao', 'Đăng ký bản tin']
            }).then(() => {
                const newsbot = (convo) => {
                    convo.ask(() => {}, (payload, convo) => {
                        (async () => {
                            switch (payload.message.text) {
                                case 'Tin mới':
                                    await convo.ask({
                                        text: "Lấy tin của 1 trong các báo sau",
                                        quickReplies: ['VNExpress', 'TinMoi', '24H', 'K14']
                                    }, (payload, convo) => {
                                        (async () => {
                                            await tin(payload.message.text, convo);
                                            newsbot(convo);
                                        })();
                                    });
                                    break;
                                case 'Thể thao':
                                    await convo.ask({
                                        text: "Môn thể thao bạn muốn biết tin tức ?",
                                        buttons: [
                                            { type: 'postback', title: 'Bóng đá', payload: 'SPORTS_BDA' }
                                        ]
                                    }, (payload, convo) => {
                                        (async () => {
                                            switch (payload.message.text) {
                                                case 'Bóng đá':
                                                    await convo.ask({
                                                        text: "Chọn một trong các tuỳ chọn sau:",
                                                        quickReplies: ['Lịch thi đấu tuần', 'Kết quả theo tuần', 'Bảng xếp hạng (Top5)', 'Bảng xếp hạng (Full)']
                                                    }, (payload, convo) => {
                                                        (async () => {
                                                            const type = await payload.message.text;
                                                            convo.ask({
                                                                text: "Giải đấu bạn mong muốn ?",
                                                                quickReplies: ['EPL', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1']
                                                            }, (payload, convo) => {
                                                                (async () => {
                                                                    const competition = payload.message.text;
                                                                    await bongda(type, competition, convo, newsbot);
                                                                })();
                                                            });
                                                        })();
                                                    });
                                                    break;
                                                default:
                                                    await convo.say("???");
                                                    newsbot(convo);
                                                    break;
                                            }
                                        })();
                                    });
                                    break;
                                case 'Công nghệ':
                                    break;
                                case 'Gaming':
                                    break;
                                case 'Đăng ký bản tin':
                                    break;
                                case 'whereami':
                                    await convo.say("Main > NewsBOT");
                                    newsbot(convo);
                                    break;
                                case 'end':
                                    convo.end();
                                    break;
                                default:
                                    await convo.say("Không có tuỳ chọn này :( Ý bạn là \'Tin mới\' hoặc \'Thể thao\' ?");
                                    newsbot(convo);
                                    break;
                            }
                        })();
                    });
                };
                newsbot(convo);
            });
        });
    });
};