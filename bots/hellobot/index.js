const request = require('request');

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
                                convo.say("Chuyện rồi sẽ qua thôi. Đừng buồn nhé :P");
                            });
                            convo.end();
                        })();
                    }
                }]);
            });
        });
    });
};