const parser = require('./parser');

module.exports = function (source, convo) {
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
    parser(url, convo);
};