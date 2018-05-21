const User = require('../../models/user');

module.exports = function (router) {
    router.get('/api/profile/:id', (req, res) => {
        User.findOne({uid: req.params.id}, {_id: 0, __v: 0, regDate: 0, modifiedDate: 0}).exec((err, result) => {
            if (err || !result) return res.json({});
            else return res.json({
                status: "success",
                data: result
            });
        });
    })
};