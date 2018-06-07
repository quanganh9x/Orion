const cognitive = require('cognitive-services');
const fs = require('fs');
const speech = new cognitive.bingSpeech({
    apiKey: "d667645fad054fb68f35fa56c49e5511"
});


// jailbroken iOS & Android will be supported. this is pending to help the disabled - Monolith by @quanganh9x
module.exports = (text) => {
    const headers = {
        "X-Microsoft-OutputFormat": "riff-8khz-8bit-mono-mulaw"
    };

    const body = {
        text: text,
        language: "vi-VN",
        voiceName: "Microsoft Server Speech Text to Speech Voice (vi-VN, An)",
        gender: "Male"
    };

    speech.getSpeech({
        headers,
        body
    }).then(response => {
        fs.writeFileSync("./output.mp3", response, 'binary');
    }).catch(err => {
        console.error(err);
    });
};
