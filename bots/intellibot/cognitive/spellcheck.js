const cognitiveServices = require('cognitive-services');
const spellCheckClient = new cognitiveServices.bingSpellCheckV7({
    apiKey: "2ff21eaca8a94c1da719c24e54289d19"
});

module.exports = (convo, intellibot) => {
    (async () => {
        await convo.say('Chú ý: chưa hỗ trợ check lỗi tiếng Việt T_T');
        convo.ask('Gửi đoạn văn bản tiếng Anh cần check lên cho mình nhé :x', (payload, convo) => {
            (async () => {
                const parameters = await {
                    "mode": "proof",
                    "mkt": "en-us",
                    "text": payload.message.text
                };
                const headers = await {};
                spellCheckClient.spellCheck({
                    parameters,
                    headers
                }).then(response => {
                    if (response.errors) {
                        convo.say('Không check được lỗi ><').then(() => intellibot(convo));
                    } else {
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
                    }
                });
            })();
        });
    })();
};