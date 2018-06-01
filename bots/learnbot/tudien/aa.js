const request = require('request');
 
module.exports = (convo, learnbot) => {
    
    request.get({
        url: "https://www.wordsapi.com/mashape/words/" + name + "/definitions?when=2018-05-25T10:05:15.606Z&encrypted=8cfdb282e722969be89407beef58bebcaeb1280936ff91b8",
        headers: {
            'x-requested-with': 'XMLHttpRequest',
            ':authority': 'www.wordsapi.com',
            ':method': 'GET',
            'Accept': 'application/json'
        }
    }, (err, response, body) => {
        if (body.definitions.length != 0) {
            for (let i = 0; i <= body.definitions.length; i++) {
                convo.say("Definition: " + body.definitions[i].definition).then(() => {
                    convo.say("Word Type " + body.definitions[i].partOfSpeech);
                });
                if (i == body.definitions.length - 1) learnbot(convo);
            }
        }
    });
};