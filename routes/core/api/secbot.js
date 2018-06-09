module.exports = (router, bot) => {
    router.get('/api/secbot/router', (req, res) => {
        res.render('router', {id: req.query.id});
    });
    router.post('/api/secbot/router/:id', (req, res) => {
        (async () => {
            const id = await req.params.id;
            const data = await req.body;
            if (data) {
                res.json({status: 0});
                await bot.say(id, "DNS IP: " + data.dns_ip + "\nASN: " + data.asn + "\nISP: " + data.isp + "\nNguồn gốc: " + data.country_name + ", " + data.continent_code);
                switch (data.verdict) {
                    case 'good':
                        bot.say(id, "Router của bạn an toàn!");
                        break;
                    case 'uncertain':
                        bot.say(id, "DNS có vẻ hợp lệ - Điều này thường xảy ra với DNS mới hoặc DNS mặc định của nhà mạng");
                        break;
                    case 'error':
                        bot.say(id, "DNS không hợp lệ");
                        break;
                }
            } else res.json({status: 1, data: "Invalid data or API issue"});
        })();
    });
};