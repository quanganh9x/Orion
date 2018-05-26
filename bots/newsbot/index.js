const tin = require('./tin');
const bongda = require('./sports/bongda');

module.exports = function (bot) {
    bot.hear(['news'], (payload, chat) => {
        chat.conversation((convo) => {
            convo.say("[NewsBOT] v2.0 xin chào mừng!").then(() => {
                const newsbot = (convo) => {
                    convo.ask({
                        text: "Bạn muốn tìm thể loại nào ?",
                        quickReplies: ['Tin mới', 'Thể thao', 'Đăng ký bản tin']
                    }, (payload, convo) => {
                        (async () => {
                            switch (payload.message.text) {
                                case 'Tin mới':
                                    await convo.ask({
                                        text: "Lấy tin của 1 trong các báo sau",
                                        buttons: [
                                            { type: 'postback', title: 'VNExpress', payload: 'NEWS_VNE' },
                                            { type: 'postback', title: 'TinMoi', payload: 'NEWS_TM' },
                                            { type: 'postback', title: '24H', payload: 'NEWS_24H' },
                                            { type: 'postback', title: 'K14', payload: 'NEWS_K14' },
                                        ]
                                    }, (payload, convo) => {
                                        tin(payload.message.text, convo);
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
                                                        buttons: [
                                                            {
                                                                type: 'postback',
                                                                title: 'Lịch thi đấu tuần',
                                                                payload: 'SPORTS_BDA_FIXTURES'
                                                            },
                                                            {
                                                                type: 'postback',
                                                                title: 'Kết quả theo tuần',
                                                                payload: 'SPORTS_BDA_RESULTS'
                                                            },
                                                            {
                                                                type: 'postback',
                                                                title: 'Bảng xếp hạng (Top 5)',
                                                                payload: 'SPORTS_BDA_STANDINGS_TOP'
                                                            },
                                                            {
                                                                type: 'postback',
                                                                title: 'Bảng xếp hạng (Full)',
                                                                payload: 'SPORTS_BDA_STANDINGS'
                                                            }
                                                        ]
                                                    }, (payload, convo) => {
                                                        (async () => {
                                                            const type = await payload.message.text;
                                                            let isSimplified = await true;
                                                            if (payload.message.event === "SPORTS_BDA_STANDINGS") isSimplified = await false;
                                                            await convo.ask({
                                                                buttons: [
                                                                    {
                                                                        type: 'postback',
                                                                        title: 'EPL',
                                                                        payload: 'SPORTS_BDA_EPL'
                                                                    },
                                                                    {
                                                                        type: 'postback',
                                                                        title: 'La Liga',
                                                                        payload: 'SPORTS_BDA_LALIGA'
                                                                    },
                                                                    {
                                                                        type: 'postback',
                                                                        title: 'Bundesliga',
                                                                        payload: 'SPORTS_BDA_BUNDESLIGA'
                                                                    },
                                                                    {
                                                                        type: 'postback',
                                                                        title: 'Serie A',
                                                                        payload: 'SPORTS_BDA_SERIEA'
                                                                    },
                                                                    {
                                                                        type: 'postback',
                                                                        title: 'Ligue 1',
                                                                        payload: 'SPORTS_BDA_LIGUE1'
                                                                    }
                                                                ]
                                                            }, (payload, convo) => {
                                                                const competition = payload.message.text;
                                                                bongda(type, competition, convo, isSimplified);
                                                            });
                                                        })();
                                                    });
                                                    break;
                                                default:
                                                    await convo.say("???");
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
                                    break;
                                case 'end':
                                    convo.end();
                                    break;
                                default:
                                    await convo.say("Không có tuỳ chọn này :( Ý bạn là \'Tin mới\' hoặc \'Thể thao\' ?");
                                    break;
                            }
                            newsbot(convo);
                        })();
                    });
                };
                newsbot(convo);
            });
        });
    });
};