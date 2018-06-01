const GoogleSearch = require('google-search');
const search = new GoogleSearch({
    key: 'AIzaSyDjeakB1alo42nS2NNR9xjSK5Zyi2yMiSA',
    cx: '010163171448574847880:qglriqbcnk4'
});

module.exports = (name, convo, searchbot) => {
    search.build({
        q: name,
        hl: "vi",
        num: 5,
        fields: "items(title,link)",
    }, function(error, response) {
        if (error) {
            console.log("err phim: " + error);
            searchbot(convo);
        }
        if (response) {
            response = JSON.parse(response);
            for (let i = 0; i < response.items.length; i++) {
                (async () => {
                    if (response.items[i].link.includes("phimmoi.net")) await response.items[i].link.replace("phimmoi.net" , "phi**oi.net");
                    await convo.say(response.items[i].title + "\n" + response.items[i].link);
                    if (i === response.items.length - 1) searchbot(convo);
                })();
            }
        }
    });
};