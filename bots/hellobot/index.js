const GIPHY_API = 'https://api.giphy.com/v1/gifs/search?api_key=vOJDsEvveDFS07zqBiV3oq5m5jj9vvUN&q=meme&limit=1&offset=0&rating=G&lang=en';

module.exports = function (bot) {
    bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {
        chat.say('Hey! Có vẻ bạn đang có một ngày vui vẻ!').then(() => {

        chat.say('Hey! Ngày mới tốt lành!').then(() => {

            chat.say({
                text: 'Hôm nay bạn thế nào?',
                quickReplies: ['super!', 'fine tho', ':/', 'T_T']
            });
        });
    });
    bot.hear(['super!', 'fine tho'], (payload, chat) => {
        chat.say('Rất vui được thấy bạn như vậy!').then(() => {
            chat.say('Tặng bạn 1 bông hoa ngày mới nha :D');
            chat.say({
                attachment: 'image',
                url: 'http://dienhoathanglong.vn/sites/d/dh/dhtl/cache/images/Products/362/Hinh_dai_dien/350x350/gio-trai-tim-hoa-hong-do.jpg'
            });
        })
    });
    bot.hear([':/', 'T_T'], (payload, chat) => {
        chat.say(':( phải chăng bạn đã có 1 ngày không mấy vui vẻ nhỉ').then(() => {
            fetch(GIPHY_API)
                .then(res => res.json())
                .then(json => {
                    chat.say('1 tấm meme tặng bạn. Vui vẻ lên!');
                    chat.say({
                        attachment: 'image',
                        url: json.data[0].images.fixed_height.url
                    });
                });
        })
    });
};