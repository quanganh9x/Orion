const parser = require('./parser');

module.exports = function (source, convo, newsbot, isPin) {
    if (isPin) {
        convo.set('pinpointFrom', convo.get('pinpointFrom') + 4);
        parser(convo.get('pinpoint'), convo, newsbot);
    } else {
        convo.set('pinpointFrom', 0);
        if (source === "Tự chọn") {
            convo.ask("Nhập đường dẫn đến RSS (chúng tôi không đảm bảo có thể đọc được, nhưng cứ thử xem sao :D)", (payload, convo) => {
                convo.set('pinpoint', payload.message.text);
                parser(payload.message.text, convo, newsbot);
            });
        } else {
            let url;
            switch (source) {
                case '24h':
                    url = 'https://www.24h.com.vn/upload/rss/tintuctrongngay.rss';
                    break;
                case 'TinMoi':
                    url = "http://www.tinmoi.vn/rss/trang-chu.rss";
                    break;
                case 'K14':
                    url = "http://kenh14.vn/home.rss";
                    break;
                default:
                    url = "https://vnexpress.net/rss/tin-moi-nhat.rss";
                    break;
            }
            convo.set('pinpoint', url);
            parser(url, convo, newsbot);
        }
    }
};