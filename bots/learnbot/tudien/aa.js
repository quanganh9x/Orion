const request = require('request');

module.exports = (word, convo, learnbot) => {
    request.get({
        url: "https://www.wordsapi.com/mashape/words/" + word + "/definitions?when=2018-05-25T10:05:15.606Z&encrypted=8cfdb282e722969be89407beef58bebcaeb1280936ff91b8",
        headers: {
            'Accept': 'application/json'
        }
    }, (err, response, body) => {
        body = JSON.parse(body);
        if (body.definitions.length !== 0) {
            let answer = "Definitions of \'" + word + "\' in English: \n";
            for (let i = 0; i < body.definitions.length; i++) {
                answer += "- " + body.definitions[i].definition + " (" + body.definitions[i].partOfSpeech + ")\n";
                if (i === body.definitions.length - 1) {
                    convo.say(answer).then(() => learnbot(convo));
                }
            }
        } else learnbot(convo);
    });
};