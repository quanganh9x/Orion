const request = require('request');
const moment = require('moment');
moment.locale('vi');
const leagues = require('./leagues');
const stroccoli = "https://stroccoli-futbol-science-v1.p.mashape.com/s1/";
const bhawlone = "https://myanmarunicorn-bhawlone-v1.p.mashape.com/competitions/";

module.exports = (type, competition, convo, isSimplified) => {
    const first = moment().startOf('week');
    const firstDate = first.format("YYYY-MM-DD");
    const lastDate = moment(first).add(6, 'days');
    switch (competition) {
        case 'epl':
            competition = leagues.epl;
            break;
        case 'laliga':
            competition = leagues.laliga;
            break;
        case 'seriea':
            competition = leagues.seriea;
            break;
        case 'ligue1':
            competition = leagues.ligue1;
            break;
        case 'bundesliga':
            competition = leagues.bundesliga;
            break;
    }
    switch (type) {
        case 'weeklyCalendar':
            weeklyCalendar(competition, firstDate, lastDate, convo);
            break;
        case 'weeklyResult':
            weeklyResult(competition, firstDate, lastDate, convo);
            break;
        case 'currentStanding':
            currentStanding(competition, isSimplified, convo);
            break;
    }
};

function weeklyCalendar(competition, first, last, convo) {
        request({
            url: stroccoli + "calendar/" + first + "/" + last + "?tournament_name=" + competition.name,
            headers: {
                'X-Mashape-Key': 'Ao3lnaaCTImshHvSCJNdrmFIpHyCp1XWchNjsnPZvluQisMair',
                'Accept': 'application/json'
            }
        }, (err, response, body) => {
            if (body.length === 0) convo.say("Không có trận nào trong tuần này :(");
            else {
                for (let i = 0; i < body.length; i++) {
                    (async () => {
                        let matchDetail = await body[i];
                        await convo.say(matchDetail.event_name + " ( " + matchDetail.home_team.name.abbrev + " vs " + matchDetail.visitant_team.name.abbrev +
                            " ) - " + matchDetail.stadium + "\nThời gian: " + new Date(Date.parse(matchDetail.start_time)).toLocaleString('vi-VN'));
                    })();
                }
            }
        });

}

function weeklyResult(competition, convo) {

        request({
            url: stroccoli + "results/" + first + "/" + last + "?tournament_name=" + competition.name,
            headers: {
                'X-Mashape-Key': 'Ao3lnaaCTImshHvSCJNdrmFIpHyCp1XWchNjsnPZvluQisMair',
                'Accept': 'application/json'
            }
        }, (err, response, body) => {
            if (body.length === 0) convo.say("Không có trận nào trong tuần này hoặc chưa đấu trận nào :(");
            else {
                for (let i = 0; i < body.length; i++) {
                    (async () => {
                        let matchDetail = await body[i];
                        convo.say(matchDetail.home_team.name.abbrev + " " + matchDetail.home_team.stats.score + " - " + matchDetail.visitant_team.stats.score + " " + matchDetail.visitant_team.name.abbrev);
                    })();
                }
            }
        });

}

function currentStanding(competition, isSimplified, convo) {
        request({
            url: bhawlone + competition.id + "/standings",
            headers: {
                'X-Mashape-Key': 'Ao3lnaaCTImshHvSCJNdrmFIpHyCp1XWchNjsnPZvluQisMair',
                'Accept': 'application/json'
            }
        }, (err, response, body) => {
            body = body.data.standings;
            if (body.length === 0) convo.say("Không có dữ liệu trong mùa ?");
            else {
                if (isSimplified) {
                    for (let i = 0; i < 5; i++) {
                        (async () => {
                            let stand = await body[i];
                            await convo.say(stand.team.name + ": " + stand.points + " (" + stand.wins + "W, " + stand.draws + "D, " + stand.losses + "L - "+ stand.goalsFor + "GF, " + stand.goalsAgainst + "GA, " + ((stand.goalsFor - stand.goalAgainst) >= 0 ? "+" : "-") + stand.goalsFor - stand.goalAgainst +"GD)");
                        })();
                    }
                } else {
                    for (let i = 0; i < body.length; i++) {
                        (async () => {
                            let stand = await body[i];
                            await convo.say(stand.team.name + ": " + stand.points + " (" + stand.wins + "W, " + stand.draws + "D, " + stand.losses + "L - "+ stand.goalsFor + "GF, " + stand.goalsAgainst + "GA, " + ((stand.goalsFor - stand.goalAgainst) >= 0 ? "+" : "-") + stand.goalsFor - stand.goalAgainst +"GD)");
                        })();
                    }
                }
            }
        });
}