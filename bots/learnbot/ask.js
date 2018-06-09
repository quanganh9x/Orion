const request = require('request');
const Translate = require('@google-cloud/translate');
const translate = new Translate({
    key: process.env.GOOGLE_API_KEY
});

module.exports = (convo, learnbot) => {
    convo.ask("Nhập câu hỏi bạn muốn ?", (payload, convo) => {
        translate.translate(payload.message.text, 'en').then(results => {
            (async () => {
                results = await results[0];
                if (results === undefined) results = await payload.message.text;
                request("http://api.wolframalpha.com/v2/query?appid="+process.env.WOLFRAM_API_KEY+"&input="+encodeURIComponent(results)+"&output=json&podindex=2", (err, response, body) => {
                    if (err || response.statusCode !== 200) {
                        console.log(err);
                        convo.say("Lỗi khi lấy dữ liệu từ wolframalpha ???").then(() => learnbot(convo));
                    } else {
                        body = JSON.parse(body);
                        for (var i = body.queryresult.pods.length - 1; i >= 0; i--) {
                            pod = body.queryresult.pods[i];
                            if (pod.markup) continue;
                            if(!pod.subpods || pod.async){
                                request(pod.async, (error, response, body) => {
                                    await translate.translate(body.pods[0].title, 'vi').then(response => {
                                        (async () => {
                                            response = response[1];
                                            const answer = await response.data.translations[0].translatedText;
                                            convo.say(answer);
                                        })();
                                    }).catch(err => {
                                        console.log(err);
                                        convo.say("Lỗi khi dịch từ/đoạn: " + body.pods[0].title).then(() => learnbot(convo));
                                    });
                                    await translate.translate(body.pods[0].subpods[0].plaintext, 'vi').then(response => {
                                        (async () => {
                                            response = response[1];
                                            const answer = await response.data.translations[0].translatedText;
                                            convo.say(answer);
                                        })();
                                    }).catch(err => {
                                        console.log(err);
                                        convo.say("Lỗi khi dịch từ/đoạn: " + body.pods[0].subpods[0].plaintext).then(() => learnbot(convo));
                                    });
                                });
                            } else if (pod.subpods[0].title === "" && pod.subpods[0].plaintext === ""){
                                continue; // bỏ qua!! không lấy được ảnh trong pod.subpods[0].img.src
                            } else {
                                await translate.translate(pod.title, 'vi').then(response => {
                                    (async () => {
                                        response = response[1];
                                        const answer = await response.data.translations[0].translatedText;
                                        convo.say(answer);
                                    })();
                                }).catch(err => {
                                    console.log(err);
                                    convo.say("Lỗi khi dịch từ/đoạn: " + pod.title).then(() => learnbot(convo));
                                });
                                await translate.translate(pod.subpods[0].plaintext, 'vi').then(response => {
                                    (async () => {
                                        response = response[1];
                                        const answer = await response.data.translations[0].translatedText;
                                        convo.say(answer);
                                    })();
                                }).catch(err => {
                                    console.log(err);
                                    convo.say("Lỗi khi dịch từ/đoạn: " + pod.subpods[0].plaintext).then(() => learnbot(convo));
                                });
                            }
                        }
                    }
                });
            })();
        }).catch(err => {
            console.log(err);
            convo.say("Lỗi khi dịch đoạn: " + payload.message.text).then(() => learnbot(convo));
        });
    });
};