const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_MAPS_KEY
});

const custom = (lat, long, convo, locationbot) => {
        convo.ask("Hãy nhập thông tin về địa điểm ?", (payload, convo) => {
            googleMapsClient.places({
                query: payload.message.text,
                language: 'vi',
                location: lat + ',' + long,
                radius: 2000
            }, function(err, response) {
                if (err) {
                    convo.say(":( Mình chưa tìm được").then(() => locationbot(convo));
                } else {
                    let i = 0;
                    while (i < response.json.results.length) {
                        (async () => {
                            await convo.say("Tên: " + response.json.results[i].name + ", địa chỉ: " + response.json.results[i].formatted_address + " (được đánh giá " + response.json.results[i].rating + "/5 sao)");
                            if (response.json.results[i].photos && response.json.results[i].photos[0].photo_reference) {
                                await googleMapsClient.placesPhoto({
                                    photoreference: response.json.results[i].photos[0].photo_reference,
                                    maxwidth: response.json.results[i].photos[0].width,
                                    maxheight: response.json.results[i].photos[0].height,
                                }, (err, res) => {
                                    convo.sendAttachment('image', res.requestUrl);
                                });
                            }
                            i++;
                            if (i === response.json.results.length) locationbot(convo);
                        })();
                    }
                }
            });
        });
};

const nearby = (lat, long, convo, locationbot) => {
    convo.ask({
        text: "Bạn muốn tìm địa điểm gì ?",
        quickReplies: [ 'bank', 'bar', 'cafe', 'doctor', 'gym', 'hospital', 'library', 'park', 'restaurant', 'shopping_mall', 'spa']
    }, (payload, convo) => {
        googleMapsClient.placesNearby({
            type: payload.message.text,
            language: 'vi',
            location: lat + ',' + long,
            radius: 1000,
            rankby: 'prominence'
        }, function(err, response) {
            if (err) {
                convo.say(":( Mình chưa tìm được").then(() => locationbot(convo));
            } else {
                let i = 0;
                while (i < response.json.results.length) {
                    (async () => {
                        await convo.say("Tên: " + response.json.results[i].name + ", địa chỉ: " + response.json.results[i].formatted_address + " (được đánh giá " + response.json.results[i].rating + "/5 sao)");
                        if (response.json.results[i].photos && response.json.results[i].photos[0].photo_reference) {
                            await googleMapsClient.placesPhoto({
                                photoreference: response.json.results[i].photos[0].photo_reference,
                                maxwidth: response.json.results[i].photos[0].width,
                                maxheight: response.json.results[i].photos[0].height,
                            }, (err, res) => {
                                convo.sendAttachment('image', res.requestUrl);
                            });
                        }
                        i++;
                        if (i === response.json.results.length) locationbot(convo);
                    })();
                }
            }
        });
    });
};

module.exports = {
    custom,
    nearby
};