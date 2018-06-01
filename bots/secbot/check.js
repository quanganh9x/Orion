const User = require('../../models/user');
const hibp = require('hibp');
const moment = require('moment');

module.exports = (convo, secbot) => {
    convo.getUserProfile().then((user) => {
        User.findOne({id: user.id}, 'email', (err, result) => {
            hibp
                .search(result.email)
                .then(data => {
                    if (data.breaches || data.pastes) {
                        let breaches = "Tìm thấy " + data.breaches.length + " lần bạn bị lộ dữ liệu\n";
                        for (let i = 0; i < data.breaches.length; i++) {
                            breaches += data.breaches[i].Title + " (" + moment(data.breaches[i].BreachDate).format("DD/MM/YYYY") +") - " + data.breaches[i].PwnCount + " tài khoản bị lộ\n";
                            if (i == data.breaches.length - 1) {
                                convo.say(breaches).then(() => {
                                    let pastes = "Tìm thấy " + data.pastes.length + " bản ghi chứa dữ liệu của bạn\n";
                                    for (let k = 0; k < data.pastes.length; k++) {
                                        pastes += (data.pastes[k].Source === "Pastebin" ? ("https://pastebin.com/"+data.pastes[k].Id) : data.pastes[k].Id) + "\n";
                                        if (k == data.pastes.length - 1) convo.say(pastes).then(() => {
                                            (async () => {
                                                await convo.say("Đừng quá hoảng hốt. Thông thường mật khẩu đã được mã hóa");
                                                await convo.say("Hãy đổi ngay mật khẩu nếu các mật khẩu bị lộ và hiện tại giống nhau. Có khả năng cao tài khoản của bạn bị xâm nhập trái phép");
                                                await convo.say("Các trang dịch vụ lớn luôn có tính năng kiểm tra bảo mật & xem lại phiên đăng nhập. Hãy sử dụng chúng");
                                                await convo.say("Luôn đề cao cảnh giác khi sử dụng Internet!");
                                                secbot(convo);
                                            })();
                                        });
                                    }
                                });
                            }
                        }
                    } else {
                        convo.say("Tuyệt vời! Tài khoản của bạn chưa bị lộ").then(() => {
                            (async () => {
                                await convo.say("Tuy nhiên bạn vẫn cần phải cẩn thận. Internet chưa bao giờ an toàn, nhất là khi bạn là người dùng mạng xã hội");
                                await convo.say("Tránh xa việc đăng ký / đăng nhập tại các trang mập mờ, luôn kiểm tra kĩ URL của trang web mình nhập thông tin vào (facebook.com # f4cebook.com, v..v..)");
                                convo.say("Tránh sử dụng các phần mềm có khả năng ghi lại dữ liệu nhập vào");
                            })();
                        });
                    }
                })
                .catch(err => {
                    console.log(err.message);
                });
        });
    });
};