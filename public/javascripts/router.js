'use strict';

$(document).ready(() => {
    const id = $("#id").text();
    $.get({
        url: "https://api.sc.fsapi.com/dnscheck/v1/router-checker",
        dataType: "json",
        success: (res) => {
            $.get({
                url: res.ping_url,
                dataType: "json",
                success: (response) => {
                    $.post({
                        url: "https://quanganh9x.ga:8001/api/router/secbot/" + id,
                        data: JSON.stringify(response),
                        traditional: true,
                        contentType: "application/json; charset=utf-8",
                        success: (resp) => {
                            if (resp.status == 0) $('#log').text("Hoàn tất. Bạn có thể đóng cửa sổ trình duyệt");
                        }
                    });
                }
            })
        }
    });
});