const SPELLCHECK_API = 'api.cognitive.microsoft.com/bing/v7.0/spellcheck';
const apiKey = '2ff21eaca8a94c1da719c24e54289d19';
const request = require('request');

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
                const headers = await {
                    'Content-Type' : 'application/x-www-form-urlencoded',
                    'Content-Length' : payload.message.text.length + 5,
                    'Ocp-Apim-Subscription-Key' : apiKey
                };
                await request.post({
                    url: SPELLCHECK_API,
                    headers: headers,
                    body: JSON.stringify(parameters)
                }, (error, response, body) => {
                    if (error) {
                        convo.say('Không check được lỗi ><').then(() => intellibot(convo));
                    } else {
                        for (let i = 0; i < body.flaggedTokens.length; i++) {
                            (async () => {
                                const offset = await body.flaggedTokens[i].offset;
                                const wrong = await body.flaggedTokens[i].token;
                                const right = await body.flaggedTokens[i].suggestions[0].suggestion;
                                await convo.say('Phát hiện lỗi ở vị trí thứ ' + offset + ', chữ: "' + wrong + '" nên thay bằng "' + right);
                                if (body.flaggedTokens[i].suggestions.length > 1) {
                                    let orText = '...hoặc thay bằng: ';
                                    for (let y = 1; y < body.flaggedTokens[i].suggestions.length; y++) {
                                        if (y === body.flaggedTokens[i].suggestions.length - 1 && y > 1) {
                                            orText += ' hoặc ';
                                        }
                                        orText += '"';
                                        orText += body.flaggedTokens[i].suggestions[y].suggestion;
                                        orText += '"';
                                        if (y === body.flaggedTokens[i].suggestions.length - 1) {
                                            orText += '.';
                                        } else orText += ',';
                                    }
                                    await convo.say(orText);
                                }
                                if (i === body.flaggedTokens.length - 1) intellibot(convo);
                            })();
                        }
                    }
                });
            })();
        });
    })();
};