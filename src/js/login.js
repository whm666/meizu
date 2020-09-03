import './library/jquery.js';
import './library/jquery-md5.js';

$('#phone').on('input', function () {
    $.ajax({
        type: "post",
        url: "../../interface/existUser.php",
        data: {
            'phone': $(this).val()
        },
        dataType: "json",
        success: function (response) {
            if (!response.has) {
                $('.phone').html(response.msg).css('color', 'green');
            } else {
                $('.phone').html('');
            }
        }
    });
})

$('#btn').on('click', function () {
    let phone = $('#phone').val();
    let password = $.md5($('#password').val() );
    // let password = $.md5($('#password').val());
    console.log(password)
    $.ajax({
        type: "post",
        url: "../../interface/login.php",
        data: {
            'phone': phone,
            'password': password
        },
        dataType: "json",
        success: function (response) {

            if (response.isLogin) {
                let ls = localStorage;
                // console.log(response);
                ls.setItem("phone", response.phone);
                location.href = '../html/shopcart.html';
            }
        }
    });
})

