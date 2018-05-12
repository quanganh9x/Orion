module.exports = function (router) {
    router.all('/', function (req, res) {
        res.render('index', {title: 'FPT Hackathon 2018 - Test Bot'});
    });
    router.get('/webhook', function (req, res) {
        if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
            return res.send(req.query['hub.challenge']);
        }
        res.send('wrong token');
    });
};