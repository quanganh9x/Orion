module.exports = (convo, secbot) => {
    convo.getUserProfile().then((user) => {
        convo.sendGenericTemplate([{
            title: 'DNS checker',
            subtitle: 'Bấm vào ĐÂY để tiến hành kiểm tra router và chờ đến khi cửa sổ hiện chữ Đã xong',
            "default_action": {
                "type": "web_url",
                "url": "https://quanganh9x.ga:8001/api/secbot/router?id=" + user.id,
                "messenger_extensions": true,
                "webview_height_ratio": "FULL"
            }
        }]).then(() => {
            secbot(convo);
        });
    });
};