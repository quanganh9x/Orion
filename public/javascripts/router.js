'use strict';

$(document).ready(() => {
    const id = $("#id").text();
    $.get({
        url: "https://cors-anywhere.herokuapp.com/https://api.sc.fsapi.com/dnscheck/v1/router-checker",
        dataType: "json",
        success: (res) => {
            $.get({
                url: "https://cors-anywhere.herokuapp.com/"+res.ping_url,
                dataType: "json",
                success: (response) => {
                    $.post({
                        url: "http://localhost:8000/api/secbot/router/" + id,
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