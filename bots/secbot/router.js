module.exports = (convo, secbot) => {
    convo.getUserProfile().then((user) => {
        convo.say("https://quanganh9x.ga:8001/api/secbot/router?id=" + user.id).then(() => {
            secbot(convo);
        });
    });
};