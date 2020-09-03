import $ from './library/jquery.js';
import { cookie } from './library/cookie.js';

(function() {
    let shop = cookie.get('shop');

    if (shop) {
        shop = JSON.parse(shop); //  有cookie数据 才转JSON

        let idList = shop.map(elm => elm.id).join(); // 获取所有id

        $.ajax({
            type: "get",
            url: "../../interface/getitems.php",
            data: {
                idList: idList
            },
            dataType: "json",
            success: function(res) {
                var template = '';
                res.forEach((elm, i) => {
                    let picture = JSON.parse(elm.picture);

                    // 让ajax获得的数据结果的id 与 cookie中id  一一对应
                    // 索引值不同

                    // 从cookie中去筛选数据
                    let arr = shop.filter(val => val.id == elm.id);

                    template += `
                        <li class="item">
                            <div class="p-box">
                                <input type="checkbox" id="checkbox">
                            </div>
                            <div class="p-img">
                                <img src="..${picture[0].src}" alt="">
                            </div>
                            <div class="p-title">
                                ${elm.title}
                            </div>
                            <div class="p-price">
                                ￥ ${elm.price}.00
                            </div>


                            <div class="p-num">
                                <a class="throw"> - </a>
                                    <input type="text" value="${arr[0].num}" id="num" min="1" max="${res.num}" data-max="12" disabled>
                                <a class="plus">+</a>
                            </div>
                            <div class="p-sum ">
                                ￥ ${(elm.price*arr[0].num).toFixed(2)}
                            </div>
                            <div class="p-del">
                                <a href="">删除</a>
                            </div>
                        </li>`;

                });

                $('#main').append(template);
                $('.p-num').on('click',function(ev){
                    if ($(ev.target).hasClass('throw')) {
                        let value = parseInt($(ev.target).next().val());
                        value = value - 1;
                        if (value < 1) {
                            value = 1;
                        }
                        $(ev.target).next().val(value);
                    };
                    if ($(ev.target).hasClass('plus')) {
                        let value = parseInt($(ev.target).prev().val());
                        value = value + 1;
                        if (value < 1) {
                            value = 1;
                        }
                      console.log(  $(ev.target).prev().val(value));
                    };
                });
                



            }
        });

    }
})();