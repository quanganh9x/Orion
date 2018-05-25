const tin = require('./tin');

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