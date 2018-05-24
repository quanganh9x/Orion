const fetch = require('node-fetch');
const GIPHY_API = 'https://api.giphy.com/v1/gifs/search?api_key=vOJDsEvveDFS07zqBiV3oq5m5jj9vvUN&limit=1&offset=0&rating=G&lang=en&q=';

module.exports = function (bot) {
    bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {
        chat.say('Hey! Ngày mới tốt lành!').then(() => {
            chat.conversation((convo) => {
                convo.ask({
                    text: 'Hôm nay bạn thế nào?',
                    quickReplies: ['super!', 'fine', ':/', 'T_T']
                }, (payload, convo) => {}, [{
                    pattern: ['super!', 'fine'],
                    callback: () => {
                        (async () => {
                            await convo.say('Rất vui được thấy bạn như vậy!');
                            await convo.say('Keep shining bright!');
                            await convo.sendAttachment(
                                'image',
                                'http://dienhoathanglong.vn/sites/d/dh/dhtl/cache/images/Products/362/Hinh_dai_dien/350x350/gio-trai-tim-hoa-hong-do.jpg'
                            );
                            convo.end();
                        })();
                    }
                }, {
                    pattern: [':/', 'T_T'],
                    callback: () => {
                        (async () => {
                            await convo.say(':( phải chăng bạn đã có 1 ngày không mấy vui vẻ nhỉ').then(() => {
                                fetch(GIPHY_API + 'meme')
                                    .then(res => res.json())
                                    .then(json => {
                                        convo.say('1 tấm meme tặng bạn. Vui vẻ lên!').then(() => {
                                            convo.sendAttachment(
                                                'image',
                                                json.data[0].images.fixed_height.url
                                            );
                                        });
                                    }).catch(() => {
                                    convo.say('Vui lên nhé :D Mình luôn bên bạn'); // anh luôn bên em mà ?
                                });
                            });
                            convo.end();
                        })();
                    }
                }]);
            });
        });
    });
};