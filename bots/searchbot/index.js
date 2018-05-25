const request = require('request');
const GOOGLE_API = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDjeakB1alo42nS2NNR9xjSK5Zyi2yMiSA&cx=010163171448574847880:qglriqbcnk4&fields=items(title,link)&hl=vi&num=5&q=";
const googleTranslate = require('google-translate')(apiKey);

module.exports = function (bot) {
    bot.hear(['tìm phim', 'kiếm phim', 'phim'], (payload, chat) => {
        chat.conversation((convo) => {
            const answer = (payload, convo) => {
                let text = payload.message.text;
                convo.say("Chờ xíu để mình tìm nhen...").then(() => {
                    request(GOOGLE_API + "xem+phim+" + text.replace(" ", "+"), function (error, response, body) {
                        if (response && response.statusCode === 200) {
                            body = JSON.parse(body);
                            for (let i = 0; i < body.items.length; i++) {
                                if (body.items[i].link.includes("phimmoi.net")) {
                                    body.items[i].link.replace("phimmoi.net", "phi**oi.net");
                                    chat.say("nếu có ** thì là 2 chữ m nghen. Do messenger bắt chặt quá T_T");
                                }
                                chat.say(body.items[i].title + "\n" + body.items[i].link);
                            }
                        } else chat.say(":( không có link rùi bạn ơi");
                        convo.end();
                    });
                });
            };
            convo.ask("Bạn muốn tìm phim gì?", answer);
        });
    });
    bot.hear(['bài hát', 'tìm nhạc', 'nhạc', 'nghe nhạc'], (payload, chat) => {
        chat.conversation((convo) => {
            const answer = (payload, convo) => {
                let text = payload.message.text;
                convo.say("Chờ xíu để mình tìm nhen...").then(() => {
                    (async () => {
                        await request.post({
                            url: 'https://graph.nhaccuatui.com/v4/searchs/search',
                            headers: {
                                'User-Agent': "NhacCuaTui/6.1.5 (iPhone; iOS 11.1.2; Scale/3.00)",
                                'x-nct-deviceid': '7B7E319D908841EC98F651F0A75A496C',
                                'x-nct-token': 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Mjk2NjkyMjQsIm5iZiI6MTUyNzA3NzIyNCwiZGV2aWNlaW5mbyI6IntcIkRldmljZUlEXCI6XCI3QjdFMzE5RDkwODg0MUVDOThGNjUxRjBBNzVBNDk2Q1wiLFwiT3NOYW1lXCI6XCJpT1NcIixcIk9zVmVyc2lvblwiOlwiMTEuMS4yXCIsXCJBcHBOYW1lXCI6XCJOQ1RWNlwiLFwiQXBwVmVyc2lvblwiOlwiNi4xLjVcIixcIlVzZXJOYW1lXCI6XCJhbmhkYW5nMjE5OVwiLFwiUHJvdmlkZXJcIjpcIk5DVENvcnBcIixcIkRldmljZU5hbWVcIjpcImlQaG9uZSA2IFBsdXNcIixcIlF1YWxpdHlQbGF5XCI6XCIxMjhcIixcIlF1YWxpdHlEb3dubG9hZFwiOlwiMTI4XCIsXCJRdWFsaXR5Q2xvdWRcIjpcIjEyOFwiLFwiTmV0d29ya1wiOlwiV0lGSVwiLFwiUGhvbmVOdW1iZXJcIjpcIjE2M3h4eHgzNjNcIixcIkxhbmd1YWdlXCI6XCJWTlwiLFwiQWRJRFwiOlwiN0QyNUY3N0QtMERERS00QkMwLUI2QkItNkIxQjcxMjhBQUM0XCJ9IiwiaWF0IjoxNTI3MDc3MjI0fQ.c9hNdw7hMCEHRWxQPGX_DGJTpRnMpKSF54SbF5Wsyy4',
                                'x-nct-version': '6.1.5'
                            },
                            form: {
                                'access_token': 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Mjk2NjkyMjQsIm5iZiI6MTUyNzA3NzIyNCwiZGV2aWNlaW5mbyI6IntcIkRldmljZUlEXCI6XCI3QjdFMzE5RDkwODg0MUVDOThGNjUxRjBBNzVBNDk2Q1wiLFwiT3NOYW1lXCI6XCJpT1NcIixcIk9zVmVyc2lvblwiOlwiMTEuMS4yXCIsXCJBcHBOYW1lXCI6XCJOQ1RWNlwiLFwiQXBwVmVyc2lvblwiOlwiNi4xLjVcIixcIlVzZXJOYW1lXCI6XCJhbmhkYW5nMjE5OVwiLFwiUHJvdmlkZXJcIjpcIk5DVENvcnBcIixcIkRldmljZU5hbWVcIjpcImlQaG9uZSA2IFBsdXNcIixcIlF1YWxpdHlQbGF5XCI6XCIxMjhcIixcIlF1YWxpdHlEb3dubG9hZFwiOlwiMTI4XCIsXCJRdWFsaXR5Q2xvdWRcIjpcIjEyOFwiLFwiTmV0d29ya1wiOlwiV0lGSVwiLFwiUGhvbmVOdW1iZXJcIjpcIjE2M3h4eHgzNjNcIixcIkxhbmd1YWdlXCI6XCJWTlwiLFwiQWRJRFwiOlwiN0QyNUY3N0QtMERERS00QkMwLUI2QkItNkIxQjcxMjhBQUM0XCJ9IiwiaWF0IjoxNTI3MDc3MjI0fQ.c9hNdw7hMCEHRWxQPGX_DGJTpRnMpKSF54SbF5Wsyy4',
                                'key': text,
                                'typeSearch': 0
                            }
                        }, (err, response, body) => { // body chứa json trả về
                            if (response && response.statusCode === 200) { // check xem api có trả về đúng hay ko
                                // lấy songKey (đọc json) cái đầu tiên
                                body = JSON.parse(body);
                                var songKey = [];
                                for (var i = 0; i < 3; i++) {
                                    songKey.push(body.data.lstSong[i].songKey);
                                }

                            }
                        });
                        for (var i = 0; i < 3; i++) {
                            await request.get({
                                url: 'https://graph.nhaccuatui.com/v4/songs/' + songKey + '?type=PlaySong&page=MusicService&iscloud=false&access_token=&cached=1&time=5',
                                headers: {
                                    'User-Agent': "NhacCuaTui/6.1.5 (iPhone; iOS 11.1.2; Scale/3.00)",
                                    'x-nct-deviceid': '7B7E319D908841EC98F651F0A75A496C',
                                    'x-nct-token': 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Mjk2NjkyMjQsIm5iZiI6MTUyNzA3NzIyNCwiZGV2aWNlaW5mbyI6IntcIkRldmljZUlEXCI6XCI3QjdFMzE5RDkwODg0MUVDOThGNjUxRjBBNzVBNDk2Q1wiLFwiT3NOYW1lXCI6XCJpT1NcIixcIk9zVmVyc2lvblwiOlwiMTEuMS4yXCIsXCJBcHBOYW1lXCI6XCJOQ1RWNlwiLFwiQXBwVmVyc2lvblwiOlwiNi4xLjVcIixcIlVzZXJOYW1lXCI6XCJhbmhkYW5nMjE5OVwiLFwiUHJvdmlkZXJcIjpcIk5DVENvcnBcIixcIkRldmljZU5hbWVcIjpcImlQaG9uZSA2IFBsdXNcIixcIlF1YWxpdHlQbGF5XCI6XCIxMjhcIixcIlF1YWxpdHlEb3dubG9hZFwiOlwiMTI4XCIsXCJRdWFsaXR5Q2xvdWRcIjpcIjEyOFwiLFwiTmV0d29ya1wiOlwiV0lGSVwiLFwiUGhvbmVOdW1iZXJcIjpcIjE2M3h4eHgzNjNcIixcIkxhbmd1YWdlXCI6XCJWTlwiLFwiQWRJRFwiOlwiN0QyNUY3N0QtMERERS00QkMwLUI2QkItNkIxQjcxMjhBQUM0XCJ9IiwiaWF0IjoxNTI3MDc3MjI0fQ.c9hNdw7hMCEHRWxQPGX_DGJTpRnMpKSF54SbF5Wsyy4',
                                    'x-nct-version': '6.1.5'
                                }
                            }, (err, response, body) => {
                                // lấy tên bài, link nghe & ảnh bìa
                                convo.say(body.data.lstSong[i].songTitle + "\n" + body.data.lstSong[i].linkShare);
                                if (i == 0) {
                                    convo.sendAttachment('image', body.data.lstSong[0].image);
                                }
                            });
                        }
                    })();
                });
            };
            convo.ask("Bạn muốn tìm bài gì?", answer);
        });
    });
    bot.hear(['dịch', 'translate', 'từ điển', 'tra từ'], (payload, chat) => {
        chat.conversation((convo) => {
            const answer = (payload, convo) => {
                let text = payload.message.text;
                googleTranslate.detectLanguage(text, function (err, detection) {
                    if (detection == 'en') {
                        googleTranslate.translate(text, 'vi', function (err, translation) {
                            chat.say(translation.translate);
                        });
                    } else if (detection == 'vi'){
                        googleTranslate.translate(text, 'en', function (err, translation) {
                            chat.say(translation.translate);
                        });
                    }
                });
            };
            convo.ask("Bạn muốn dịch gì", answer);
        });
    });
};