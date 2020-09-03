import './library/jquery.js';
import './library/jquery-md5.js';

let registObj = {};
let registStr = '';
$('#main-form input').on('input', function () {
    $('#myform input').each(function (i, e) {

        if (e.name == 'password') {
            registObj[e.name] = $.md5($(e).val() + 'yy');
        } else {
            registObj[e.name] = $(e).val();
            let phone = $('#phone').val();
            $.ajax({
                type: "get",
                url: "../../interface/existUser.php",
                data: {
                    'phone': phone
                },
                success: function (response) {

                    response = JSON.parse(response);
                    if (!response.has) {
                        $('.phone').html(response.msg).css('color', 'red');
                        $('#phone').attr('data-pass', false);
                    }
                }
            });
        }
    })


});

$('#btn').on('click', function () {
    registObj['phone'] = $('#phone').val();
    registObj['password'] = $.md5($('#password').val());
    registObj['createtime'] = new Date().toLocaleDateString();

    registStr = JSON.stringify(registObj);

    $.ajax({
        type: "post",
        url: "../../interface/reg.php",
        data: registStr,
        dataType: "json",
        success: function (response) {
            // response = JSON.parse(response);
            console.log(response);
            if (response.isRegist) {
                location.href = "../html/login.html";
            }
        }
    });
})


$(function () {
    let reg = {
        "phone": /^1[3-9]\d{9}$/,
        "password": /^.{6,16}$/
    };


    $('#main-form input:not([type="button"])').each(function (index, elm) {
        $(elm).on('input', function () {
            if (reg[$(elm).attr('id')].test($(elm).val())) {
                $('span[class="' + $(elm).attr('id') + '"]').html('通过验证');
                $(this).attr('data-pass', true);
            } else {
                $('span[class="' + $(elm).attr('id') + '"]').html('未通过验证');
                $(this).attr('data-pass', false);
            }
            check();
        });
    });



    function check() {
        if ($('[data-pass=true]').length == 2) {
            $('#btn').removeAttr('disabled');
        } else {
            $('#btn').attr('disabled', 'disabled');
        }
    }

});