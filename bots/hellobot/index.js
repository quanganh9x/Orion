const request = require('request');
const GIPHY_API = 'https://api.giphy.com/v1/gifs/search?api_key=vOJDsEvveDFS07zqBiV3oq5m5jj9vvUN&limit=1&offset=0&rating=G&lang=en&q=';

module.exports = function (bot) {
    bot.hear(['chào', 'xin chào', 'hello', 'hi', /hey( there)?/i], (payload, chat) => {
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
                            await convo.say('<3');
                            convo.end();
                        })();
                    }
                }, {
                    pattern: [':/', 'T_T'],
                    callback: () => {
                        (async () => {
                            await convo.say(':( phải chăng bạn đã có 1 ngày không mấy vui vẻ nhỉ').then(() => {
                                request.get(GIPHY_API + 'fun', (err, response, body) => {
                                    if (response && response.statusCode === 200) {
                                        convo.say('1 tấm meme xin tặng bạn!');
                                        convo.sendAttachment('image', body.data[0].images.fixed_height.url);
                                    } else convo.say("Chuyện rồi sẽ qua thôi. Đừng buồn nhé :P");
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