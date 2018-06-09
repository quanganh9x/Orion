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
                console.log(err);
                convo.say(":( Mình chưa tìm được").then(() => locationbot(convo));
            } else {
                if (response.json.results && response.json.results.length !== 0) {
                    let elements = [];
                    const len = (response.json.results.length > 4 ? 4 : response.json.results.length);
                    if (len > 2) {
                        for (let i = 0; i < len; i++) {
                            const name = response.json.results[i].name;
                            const address = response.json.results[i].formatted_address === undefined ? response.json.results[i].vicinity : response.json.results[i].formatted_address;
                            if (response.json.results[i].photos) {
                                const image = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=" + response.json.results[i].photos[0].width + "&maxheight=" + response.json.results[i].photos[0].height + "&photoreference=" + response.json.results[i].photos[0].photo_reference + "&key=" + process.env.GOOGLE_MAPS_KEY;
                                elements.push({title: name, subtitle: address, image_url: image});
                            } else elements.push({title: name, subtitle: address});
                            if (i === len - 1) {
                                convo.sendListTemplate(elements, undefined, {topElementStyle: "compact"});
                                locationbot(convo);
                            }
                        }
                    } else convo.say(":( Không thấy địa điểm nào").then(() => locationbot(convo));
                } else convo.say(":( không tìm thấy").then(() => locationbot(convo));
            }
        });
    });
};

const nearby = (lat, long, convo, locationbot) => {
    convo.ask({
        text: "Bạn muốn tìm địa điểm gì ?",
        quickReplies: [ 'bank', 'bar', 'cafe', 'doctor', 'gym', 'hospital', 'library', 'park', 'restaurant', 'shopping_mall']
    }, (payload, convo) => {
        googleMapsClient.placesNearby({
            type: payload.message.text,
            language: 'vi',
            location: lat + ',' + long,
            radius: 1500
        }, function(err, response) {
            if (err) {
                console.log(err);
                convo.say(":( Mình chưa tìm được").then(() => locationbot(convo));
            } else {
                if (response.json.results && response.json.results.length !== 0) {
                    let elements = [];
                    const len = (response.json.results.length > 4 ? 4 : response.json.results.length);
                    if (len >= 2) {
                        for (let i = 0; i < len; i++) {
                            const name = response.json.results[i].name;
                            const address = response.json.results[i].formatted_address === undefined ? response.json.results[i].vicinity : response.json.results[i].formatted_address;
                            if (response.json.results[i].photos) {
                                const image = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=" + response.json.results[i].photos[0].width + "&maxheight=" + response.json.results[i].photos[0].height + "&photoreference=" + response.json.results[i].photos[0].photo_reference + "&key=" + process.env.GOOGLE_MAPS_KEY;
                                elements.push({title: name, subtitle: address, image_url: image});
                            } else elements.push({title: name, subtitle: address});
                            if (i === len - 1) {
                                convo.sendListTemplate(elements, undefined, {topElementStyle: "compact"});
                                locationbot(convo);
                            }
                        }
                    } else convo.say(":( Không thấy địa điểm nào").then(() => locationbot(convo));
                } else convo.say(":( không tìm thấy").then(() => locationbot(convo));
            }
        });
    });
};

module.exports = {
    custom,
    nearby
};