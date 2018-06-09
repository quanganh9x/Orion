const request = require('request');
const NCT_API = 'https://graph.nhaccuatui.com/v4/';

module.exports = (name, convo, searchbot) => {
    request.post({
        url: NCT_API + 'searchs/search',
        headers: {
            'User-Agent': "NhacCuaTui/6.1.5 (iPhone; iOS 11.1.2; Scale/3.00)",
            'Content-Type': "application/x-www-url-encoded"
            'x-nct-deviceid': '7B7E319D908841EC98F651F0A75A496C',
            'x-nct-token': 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Mjk2NjkyMjQsIm5iZiI6MTUyNzA3NzIyNCwiZGV2aWNlaW5mbyI6IntcIkRldmljZUlEXCI6XCI3QjdFMzE5RDkwODg0MUVDOThGNjUxRjBBNzVBNDk2Q1wiLFwiT3NOYW1lXCI6XCJpT1NcIixcIk9zVmVyc2lvblwiOlwiMTEuMS4yXCIsXCJBcHBOYW1lXCI6XCJOQ1RWNlwiLFwiQXBwVmVyc2lvblwiOlwiNi4xLjVcIixcIlVzZXJOYW1lXCI6XCJhbmhkYW5nMjE5OVwiLFwiUHJvdmlkZXJcIjpcIk5DVENvcnBcIixcIkRldmljZU5hbWVcIjpcImlQaG9uZSA2IFBsdXNcIixcIlF1YWxpdHlQbGF5XCI6XCIxMjhcIixcIlF1YWxpdHlEb3dubG9hZFwiOlwiMTI4XCIsXCJRdWFsaXR5Q2xvdWRcIjpcIjEyOFwiLFwiTmV0d29ya1wiOlwiV0lGSVwiLFwiUGhvbmVOdW1iZXJcIjpcIjE2M3h4eHgzNjNcIixcIkxhbmd1YWdlXCI6XCJWTlwiLFwiQWRJRFwiOlwiN0QyNUY3N0QtMERERS00QkMwLUI2QkItNkIxQjcxMjhBQUM0XCJ9IiwiaWF0IjoxNTI3MDc3MjI0fQ.c9hNdw7hMCEHRWxQPGX_DGJTpRnMpKSF54SbF5Wsyy4',
            'x-nct-version': '6.1.5'
        },
        form: {
            'access_token': 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Mjk2NjkyMjQsIm5iZiI6MTUyNzA3NzIyNCwiZGV2aWNlaW5mbyI6IntcIkRldmljZUlEXCI6XCI3QjdFMzE5RDkwODg0MUVDOThGNjUxRjBBNzVBNDk2Q1wiLFwiT3NOYW1lXCI6XCJpT1NcIixcIk9zVmVyc2lvblwiOlwiMTEuMS4yXCIsXCJBcHBOYW1lXCI6XCJOQ1RWNlwiLFwiQXBwVmVyc2lvblwiOlwiNi4xLjVcIixcIlVzZXJOYW1lXCI6XCJhbmhkYW5nMjE5OVwiLFwiUHJvdmlkZXJcIjpcIk5DVENvcnBcIixcIkRldmljZU5hbWVcIjpcImlQaG9uZSA2IFBsdXNcIixcIlF1YWxpdHlQbGF5XCI6XCIxMjhcIixcIlF1YWxpdHlEb3dubG9hZFwiOlwiMTI4XCIsXCJRdWFsaXR5Q2xvdWRcIjpcIjEyOFwiLFwiTmV0d29ya1wiOlwiV0lGSVwiLFwiUGhvbmVOdW1iZXJcIjpcIjE2M3h4eHgzNjNcIixcIkxhbmd1YWdlXCI6XCJWTlwiLFwiQWRJRFwiOlwiN0QyNUY3N0QtMERERS00QkMwLUI2QkItNkIxQjcxMjhBQUM0XCJ9IiwiaWF0IjoxNTI3MDc3MjI0fQ.c9hNdw7hMCEHRWxQPGX_DGJTpRnMpKSF54SbF5Wsyy4',
            'key': name.replace(' ','+'),
            'typeSearch': 0
        }
    }, (err, response, body) => {
        console.log(body);
        body = JSON.parse(body);
        if (body.data.lstSong && body.data.lstSong.length !== 0) {
            let songKey = [];
            for (let i = 0; i < (body.data.lstSong.length > 3 ? 3 : body.data.lstSong.length); i++) {
                songKey.push(body.data.lstSong[i].songKey);
            }
            for (let i = 0; i < songKey.length; i++) {
                (async () => {
                    await request.get({
                        url: NCT_API + 'songs/' + songKey[i] + '?type=PlaySong&page=MusicService&iscloud=false&access_token=&cached=1&time=5',
                        headers: {
                            'User-Agent': "NhacCuaTui/6.1.5 (iPhone; iOS 11.1.2; Scale/3.00)",
                            'x-nct-deviceid': '7B7E319D908841EC98F651F0A75A496C',
                            'x-nct-token': 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Mjk2NjkyMjQsIm5iZiI6MTUyNzA3NzIyNCwiZGV2aWNlaW5mbyI6IntcIkRldmljZUlEXCI6XCI3QjdFMzE5RDkwODg0MUVDOThGNjUxRjBBNzVBNDk2Q1wiLFwiT3NOYW1lXCI6XCJpT1NcIixcIk9zVmVyc2lvblwiOlwiMTEuMS4yXCIsXCJBcHBOYW1lXCI6XCJOQ1RWNlwiLFwiQXBwVmVyc2lvblwiOlwiNi4xLjVcIixcIlVzZXJOYW1lXCI6XCJhbmhkYW5nMjE5OVwiLFwiUHJvdmlkZXJcIjpcIk5DVENvcnBcIixcIkRldmljZU5hbWVcIjpcImlQaG9uZSA2IFBsdXNcIixcIlF1YWxpdHlQbGF5XCI6XCIxMjhcIixcIlF1YWxpdHlEb3dubG9hZFwiOlwiMTI4XCIsXCJRdWFsaXR5Q2xvdWRcIjpcIjEyOFwiLFwiTmV0d29ya1wiOlwiV0lGSVwiLFwiUGhvbmVOdW1iZXJcIjpcIjE2M3h4eHgzNjNcIixcIkxhbmd1YWdlXCI6XCJWTlwiLFwiQWRJRFwiOlwiN0QyNUY3N0QtMERERS00QkMwLUI2QkItNkIxQjcxMjhBQUM0XCJ9IiwiaWF0IjoxNTI3MDc3MjI0fQ.c9hNdw7hMCEHRWxQPGX_DGJTpRnMpKSF54SbF5Wsyy4',
                            'x-nct-version': '6.1.5'
                        }
                    }, (err, response, body) => {
                        body = JSON.parse(body);
                        if (body.data) convo.say(body.data.songTitle + ": " + body.data.linkShare + "\nDownload: " + body.data.streamURL[0].download);
                    });
                    if (i === songKey.length - 1) searchbot(convo);
                })();
            }
        } else convo.say(":( Không tìm thấy").then(() => searchbot(convo));
    });
};