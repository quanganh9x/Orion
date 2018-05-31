module.exports = (convo, secbot) => {
    convo.getUserProfile().then((user) => {
        convo.say("http://localhost:3000/api/secbot/router?id=" + user.id).then(() => {
            secbot(convo);
        });
    });
};