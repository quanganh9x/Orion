const cognitiveServices = require('cognitive-services');
const spellCheckClient = new cognitiveServices.bingSpellCheckV7({
    apiKey: "6a66938141944a289dc084312c5abc9e"
});

module.exports = (convo, intellibot) => {
    (async () => {
        await convo.say('Chú ý: chưa hỗ trợ check lỗi tiếng Việt T_T');
        convo.ask('Gửi đoạn văn bản tiếng Anh cần check lên cho mình nhé :x', (payload, convo) => {
            (async () => {
                const parameters = await {
                    text: payload.message.text.replace('\n', ' ')
                };
                const headers = {};
                spellCheckClient.spellCheck({
                    parameters,
                    headers
                }).then(response => {
                    console.log(response);
                    if (response.flaggedTokens) {
                        if (response.flaggedTokens.length !== 0) {
                            for (let i = 0; i < response.flaggedTokens.length; i++) {
                                (async () => {
                                    const offset = await response.flaggedTokens[i].offset;
                                    const wrong = await response.flaggedTokens[i].token;
                                    const right = await response.flaggedTokens[i].suggestions[0].suggestion;
                                    await convo.say('Phát hiện lỗi ở vị trí thứ ' + offset + ', chữ: "' + wrong + '" nên thay bằng "' + right);
                                    if (response.flaggedTokens[i].suggestions.length > 1) {
                                        let orText = '...hoặc thay bằng: ';
                                        for (let y = 1; y < response.flaggedTokens[i].suggestions.length; y++) {
                                            if (y === response.flaggedTokens[i].suggestions.length - 1 && y > 1) {
                                                orText += ' hoặc ';
                                            }
                                            orText += '"';
                                            orText += response.flaggedTokens[i].suggestions[y].suggestion;
                                            orText += '"';
                                            if (y === response.flaggedTokens[i].suggestions.length - 1) {
                                                orText += '.';
                                            } else orText += ',';
                                        }
                                        await convo.say(orText);
                                    }
                                    if (i === response.flaggedTokens.length - 1) intellibot(convo);
                                })();
                            }
                        } else if (response.flaggedTokens.length === 0) convo.say('Không có lỗi sai :D').then(() => intellibot(convo));
                    } else convo.say('Không check được. Văn bản nhập liệu có lỗi T_T').then(() => intellibot(convo));
                });
            })();
        });
    })();
};