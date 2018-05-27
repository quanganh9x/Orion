const request = require('request');
const moment = require('moment');
moment.locale('vi');
const leagues = require('./leagues');
const stroccoli = "https://stroccoli-futbol-science-v1.p.mashape.com/s1/";
const bhawlone = "https://myanmarunicorn-bhawlone-v1.p.mashape.com/competitions/";

module.exports = (type, competition, convo, newsbot) => {
    const first = moment().startOf('week');
    const firstDate = first.format("YYYY-MM-DD");
    const lastDate = moment(first).add(6, 'days');
    switch (competition) {
        case 'EPL':
            competition = leagues.epl;
            break;
        case 'La Liga':
            competition = leagues.laliga;
            break;
        case 'Serie A':
            competition = leagues.seriea;
            break;
        case 'Ligue 1':
            competition = leagues.ligue1;
            break;
        case 'Bundesliga':
            competition = leagues.bundesliga;
            break;
        default:
            competition = leagues.epl;
            convo.say("Sử dụng tuỳ chọn EPL làm mặc định");
            break;
    }
    switch (type) {
        case 'Lịch thi đấu tuần':
            weeklyCalendar(competition, firstDate, lastDate, convo);
            break;
        case 'Kết quả theo tuần':
            weeklyResult(competition, firstDate, lastDate, convo);
            break;
        case 'Bảng xếp hạng (Top5)':
            currentStanding(competition, true, convo, newsbot);
            break;
        case 'Bảng xếp hạng Full':
            currentStanding(competition, false, convo);
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
            console.log(body);
            if (body.length === 0) convo.say("Không có trận nào trong tuần này :(");
            else {
                for (let i = 0; i < body.length; i++) {
                    (async () => {
                        let matchDetail = await body[i];
                        convo.say(matchDetail.event_name + " ( " + matchDetail.home_team.name.abbrev + " vs " + matchDetail.visitant_team.name.abbrev +
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
                console.log(body);
                for (let i = 0; i < body.length; i++) {
                    (async () => {
                        let matchDetail = await body[i];
                        convo.say(matchDetail.home_team.name.abbrev + " " + matchDetail.home_team.stats.score + " - " + matchDetail.visitant_team.stats.score + " " + matchDetail.visitant_team.name.abbrev);
                    })();
                }
            }
        });

}

function currentStanding(competition, isSimplified, convo, newsbot) {
        request({
            url: bhawlone + competition.id + "/standings",
            headers: {
                'X-Mashape-Key': 'Ao3lnaaCTImshHvSCJNdrmFIpHyCp1XWchNjsnPZvluQisMair',
                'Accept': 'application/json'
            }
        }, (err, response, body) => {
            console.log(body);
            body = JSON.parse(body);
            body = body.data.standings;
            if (body.length === 0) convo.say("Không có dữ liệu trong mùa ?");
            else {
                (async () => {
                    if (isSimplified) {
                        let answer;
                        for (let i = 0; i < 5; i++) {
                            (async () => {
                                let stand = await body[i];
                                answer += await stand.team.name + ": " + stand.points + " (" + stand.wins + "W, " + stand.draws + "D, " + stand.losses + "L - " + stand.goalsFor + "GF, " + stand.goalsAgainst + "GA, " + ((stand.goalsFor - stand.goalsAgainst) >= 0 ? "+" : "-") + (stand.goalsFor - stand.goalsAgainst) + "GD)\n";
                                if (i == 4) convo.say(answer); // prevent race condition
                            })();
                        }
                    } else {
                        let answer;
                        for (let i = 0; i < body.length; i++) {
                            (async () => {
                                let stand = await body[i];
                                answer += await stand.team.name + ": " + stand.points + " (" + stand.wins + "W, " + stand.draws + "D, " + stand.losses + "L - " + stand.goalsFor + "GF, " + stand.goalsAgainst + "GA, " + ((stand.goalsFor - stand.goalsAgainst) >= 0 ? "+" : "-") + (stand.goalsFor - stand.goalsAgainst) + "GD)\n";
                                if (i == body.length-1) convo.say(answer);
                            })();
                        }
                    }
                    newsbot(convo);
                })();

            }
        });
}