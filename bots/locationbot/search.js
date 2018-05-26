
module.exports = (convo) => {
    convo.ask({
        text: 'Bạn muốn làm gì nè?',
        quickReplies: ['Quẩyyyyy','Thăm quan', 'Cà phê', 'Chơi ngoài trời', 'Xem phim']
    }, (payload, convo) {
        convo.set('answer', payload.message.text);
    });
    switch (convo.get('answer')) {
        case 'Quẩyyyyy':
            search(lat, long, 'night_club', convo);
            break;
        case 'Thăm quan':
            search(lat, long, 'museum', convo);
            break;
        case 'Cà phê':
            search(lat, long, 'cafe', convo);
            break;
        case 'Chơi ngoài trời':
            search(lat, long, 'amusement_park', convo);
            break;
        case 'Xem phim':
            search(lat, long, 'movie_theater', convo);
            break;
        case default:
        convo.say("Huhhhhhhhhhhhhhhhhhh???");
        break;
    }
};