const Client = require('node-wolfram');
const wolfram = new Client('9WTJXY-KEKYY3AGXQ');
const translator = require('google-translator');

module.exports = (convo, learnbot) => {
    convo.ask("Nhập câu hỏi bạn muốn dịch ?").then(() => {
        const text = payload.message.text;
        translator('vi', 'en', text, response => {
            wolfram.query(response.text, function (err, result) {
                if (err) {
                    convo.say("???").then(() => {
                        learnbot(convo);
                    });
                } else {
                    translator('en', 'vi', result.queryresult.pod[1].subpod.plaintext[0], response => {
                        (async () => {
                            const answer = await response.text;
                            convo.say("Xin trả lời: " + answer).then(() => {
                                learnbot(convo);
                            });
                        })();
                    });
                }
            });
        });
    });
};