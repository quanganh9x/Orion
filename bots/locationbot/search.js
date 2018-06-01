var googleMapsClient = require('@google/maps').createClient({
    key: AIzaSyA42-BdG6xhKl6dbERzohN4UJAkHTmio9c //process.env.API_KEY,
});

module.exports = (lat, long, convo) => {
	(async () => {
        await convo.ask("Bạn muốn tìm địa điểm gì?", (payload, convo) => {
            await googleMapsClient.places({
                query: payload.message.text,
                location: lat + ',' + long,
                radius: 7000,
                opennow: true
            }, function(err, response) {
                if (err) {
                    convo.say(":( Mình chưa tìm được địa điểm nào rồi");
                    convo.end();
                } else {
                    for (let i = 0; i < response.json.results.length; i++) {
                        var name = response.json.results[i].name;
                        var address = response.json.results[i].formatted_address;
                        convo.say(name + " ở " + address);
                    }
                    convo.end();
                }
            });
        });
    })
};

