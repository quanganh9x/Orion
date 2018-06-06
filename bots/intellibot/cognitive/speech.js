const cognitive = require('cognitive-services');
const speech = new cognitive.speakerVerification({
    apiKey: "ebb312c2b5304b1d9146d73c3e49bfbf",
    endpoint: "westus.api.cognitive.microsoft.com"
});
const User = require('../../../models/user');
const toWav = require('audiobuffer-to-wav');
const xhr = require('xhr');
const AudioContext = require('web-audio-api').AudioContext;
const context = new AudioContext();

const createProfile = () => {
    const body = {
        locale: 'en-US'
    };
    speech.createProfile(body).then(response => {
        response = JSON.parse(response);
        return response.verificationProfileId;
    });
};

const enroll = (convo, intellibot) => {
    let enrollLinks = [];
    const first = (convo) => {
        convo.ask("Đọc theo câu: 'apple juice tastes funny after toothpaste'", (payload, convo) => {
            if (payload.message.attachments[0].type === 'audio') {
                convo.set('link1', payload.message.attachments[0].payload.url);
                enrollLinks.push(payload.message.attachments[0].payload.url);
                second(convo);
            }
        });
    };
    const second = (convo) => {
        convo.ask("Lần thứ 2: 'apple juice tastes funny after toothpaste'", (payload, convo) => {
            if (payload.message.attachments[0].type === 'audio') {
                convo.set('link2', payload.message.attachments[0].payload.url);
                enrollLinks.push(payload.message.attachments[0].payload.url);
                third(convo);
            }
        });
    };
    const third = (convo) => {
        convo.ask("Lần cuối cùng: 'apple juice tastes funny after toothpaste'", (payload, convo) => {
            if (payload.message.attachments[0].type === 'audio') {
                convo.set('link3', payload.message.attachments[0].payload.url);
                enrollLinks.push(payload.message.attachments[0].payload.url);
                process(convo);
            }
        });
    };
    const process = (convo) => {
        let counts = 3;
        for (let i = 0; i < 3; i++) {
            let res = request.get(enrollLinks[i]);
            let data = [];
            res.on("data", function(chunk) {
                data.push(chunk);
            });
            res.on("end", function() {
                data = Buffer.concat(data);
                console.log(data);
                context.decodeAudioData(data).then((buffer) => {
                    const wav = toWav(buffer);
                });

                context.decodeAudioData(ret).then(buffer => {
                    (async () => {
                        const profileId = createProfile();
                        const parameters = await {
                            'verificationProfileId': profileId
                        };
                        const headers = await {
                            'Content-Type': 'application/octet-stream'
                        };
                        const body = await toWav(buffer);
                        speech.createEnrollment({
                            parameters,
                            headers,
                            body
                        }).then(response => {
                            response = JSON.parse(response);
                            counts--;
                            console.log(response.remainingEnrollments);
                            if (counts === 0 || i === 2) {
                                convo.getUserProfile().then(user => {
                                    User.findOneAndUpdate({id: user.id}, {$set: {sid: profileId}}, {new: true}, (err, result) => {
                                        if (err || !result) {
                                            console.error(err);
                                        }
                                        else convo.say("Đã ghi lại nhận diện giọng nói!").then(() => intellibot(convo));
                                    });
                                })
                            }
                        });
                    })();
                });
            });
        }
    };
    first(convo);
};

const verifyEnrollment = (convo, intellibot) => {
    convo.ask("Hãy gửi audio chứa: 'apple juice tastes funny after toothpaste' để nhận dạng", (payload, convo) => {
        if (payload.message.attachments[0].type === 'audio') {
            xhr({
                uri: payload.message.attachments[0].payload.url,
                responseType: 'arraybuffer'
            }, function (err, resp, ret) {
                if (err) {
                    console.error(err);
                } else context.decodeAudioData(ret).then(buffer => {
                        convo.getUserProfile().then(user => {
                            User.findOne({id: user.id}, (err, result) => {
                                if (err || !result) console.log(err);
                                else {
                                    const parameters = {
                                        'verificationProfileId': result.sid
                                    };
                                    const headers = {
                                        'Content-Type': 'application/octet-stream'
                                    };
                                    const body = toWav(buffer);
                                    speech.verify({
                                        parameters,
                                        headers,
                                        body
                                    }).then(response => {
                                        response = JSON.parse(response);
                                        if (response.result === "Accept") return true;
                                        return false;
                                    });
                                }
                            });
                        });
                });
            });
        } else convo.say("Không nhận dạng được :(").then(() => intellibot(convo));
    });
};

module.exports = {
    enroll,
    verifyEnrollment
};