const request = require('request');
const NCT_API = 'https://graph.nhaccuatui.com/v4/';

module.exports = (name, convo, searchbot) => {
    (async () => {
        await request.post({
            url: NCT_API + 'searchs/search',
            headers: {
                'User-Agent': "NhacCuaTui/6.1.5 (iPhone; iOS 11.1.2; Scale/3.00)",
                'x-nct-deviceid': '7B7E319D908841EC98F651F0A75A496C',
                'x-nct-token': 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Mjk2NjkyMjQsIm5iZiI6MTUyNzA3NzIyNCwiZGV2aWNlaW5mbyI6IntcIkRldmljZUlEXCI6XCI3QjdFMzE5RDkwODg0MUVDOThGNjUxRjBBNzVBNDk2Q1wiLFwiT3NOYW1lXCI6XCJpT1NcIixcIk9zVmVyc2lvblwiOlwiMTEuMS4yXCIsXCJBcHBOYW1lXCI6XCJOQ1RWNlwiLFwiQXBwVmVyc2lvblwiOlwiNi4xLjVcIixcIlVzZXJOYW1lXCI6XCJhbmhkYW5nMjE5OVwiLFwiUHJvdmlkZXJcIjpcIk5DVENvcnBcIixcIkRldmljZU5hbWVcIjpcImlQaG9uZSA2IFBsdXNcIixcIlF1YWxpdHlQbGF5XCI6XCIxMjhcIixcIlF1YWxpdHlEb3dubG9hZFwiOlwiMTI4XCIsXCJRdWFsaXR5Q2xvdWRcIjpcIjEyOFwiLFwiTmV0d29ya1wiOlwiV0lGSVwiLFwiUGhvbmVOdW1iZXJcIjpcIjE2M3h4eHgzNjNcIixcIkxhbmd1YWdlXCI6XCJWTlwiLFwiQWRJRFwiOlwiN0QyNUY3N0QtMERERS00QkMwLUI2QkItNkIxQjcxMjhBQUM0XCJ9IiwiaWF0IjoxNTI3MDc3MjI0fQ.c9hNdw7hMCEHRWxQPGX_DGJTpRnMpKSF54SbF5Wsyy4',
                'x-nct-version': '6.1.5'
            },
            form: {
                'access_token': 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Mjk2NjkyMjQsIm5iZiI6MTUyNzA3NzIyNCwiZGV2aWNlaW5mbyI6IntcIkRldmljZUlEXCI6XCI3QjdFMzE5RDkwODg0MUVDOThGNjUxRjBBNzVBNDk2Q1wiLFwiT3NOYW1lXCI6XCJpT1NcIixcIk9zVmVyc2lvblwiOlwiMTEuMS4yXCIsXCJBcHBOYW1lXCI6XCJOQ1RWNlwiLFwiQXBwVmVyc2lvblwiOlwiNi4xLjVcIixcIlVzZXJOYW1lXCI6XCJhbmhkYW5nMjE5OVwiLFwiUHJvdmlkZXJcIjpcIk5DVENvcnBcIixcIkRldmljZU5hbWVcIjpcImlQaG9uZSA2IFBsdXNcIixcIlF1YWxpdHlQbGF5XCI6XCIxMjhcIixcIlF1YWxpdHlEb3dubG9hZFwiOlwiMTI4XCIsXCJRdWFsaXR5Q2xvdWRcIjpcIjEyOFwiLFwiTmV0d29ya1wiOlwiV0lGSVwiLFwiUGhvbmVOdW1iZXJcIjpcIjE2M3h4eHgzNjNcIixcIkxhbmd1YWdlXCI6XCJWTlwiLFwiQWRJRFwiOlwiN0QyNUY3N0QtMERERS00QkMwLUI2QkItNkIxQjcxMjhBQUM0XCJ9IiwiaWF0IjoxNTI3MDc3MjI0fQ.c9hNdw7hMCEHRWxQPGX_DGJTpRnMpKSF54SbF5Wsyy4',
                'key': name,
                'typeSearch': 0
            }
        }, (err, response, body) => {
            body = JSON.parse(body);
                let songKey = [];
                for (let i = 0; i < 3; i++) {
                    songKey.push(body.data.lstSong[i].songKey);
                }
                convo.set('key', songKey);
        });
        let songKey = await convo.get('key');
        for (let i = 0; i < 3; i++) {
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
                convo.say(body.data.lstSong[i].songTitle + "\n" + body.data.lstSong[i].linkShare);
            });
            if (i === 3) searchbot(convo);
        }
    })();
};