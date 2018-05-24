const NEARBYSEARCH_API = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyA42-BdG6xhKl6dbERzohN4UJAkHTmio9c&rankby=distance';
const TEXTSEARCH_API = 'https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyA42-BdG6xhKl6dbERzohN4UJAkHTmio9c';
const GEOCODING_API = 'http://maps.googleapis.com/maps/api/geocode/json?location_type=ROOFTOP&result_type=street_address&sensor=true&key=AIzaSyA42-BdG6xhKl6dbERzohN4UJAkHTmio9c';


module.exports = (lat, long, type, convo) => {
	(async () => {
        await request(NEARBYSEARCH_API + '&location=' + lat + ',' + long + '&type=' + type, function (error, response, body) {
            if (JSON.parse(body).status !== "OK") {
                console.log('Không lấy được danh sách địa điểm??? ' + response.status);
                return;
            } else {
                body = JSON.parse(body);
                for (let i = 0; i < body.results.length; i++) {
                    if (body.results[i].opening_hours.open_now && !permanently_closed) {
                        var name = body.results[i].name;
                        var latPlace = body.results[i].geometry.location.lat;
                        var lngPlace = body.results[i].geometry.location.lng;
                        await request(GEOCODING_API + '&latlng' + latPlace + ',' + lngPlace, function(error, response, body){
                            if (JSON.parse(body).status !== "OK") {
                            console.log('Không tìm được địa chỉ từ tọa độ??? ' + response.status);
                            return;
                            } else {
                                body = JSON.parse(body);
                                var address = body.results[0].formatted_address;
                            }
                        });
                    }
                    convo.say(name + " ở " + address);
                }
                convo.end();
            }
        });
    })
};