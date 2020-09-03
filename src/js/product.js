import $ from './library/jquery.js';
import { cookie } from './library/cookie.js';

(function() {
    let id = location.search.split('=')[1]; // 获取id


    $.ajax({
        type: "get",
        url: "../../interface/getitem.php",
        data: {
            id: id
        },
        dataType: "json",
        success: function(res) {
            let picture = JSON.parse(res.picture);

            let template = `
            <!-- 物品图 -->
            <div class="preview">
                <div class="preview-mid">
                    <a href="">
                        <img src="..${picture[0].src}" height="560" width="560" alt="">
                    </a>
                </div>
                <!-- 小图 -->
                <ul class="preview-small">
                    <li class="">
                        <a href="#">
                            <img src="..${picture[0].src}" width="80" height="80">
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <img src="..${picture[1].src}">
                        </a>
                    </li>
                </ul>
                <!-- 收藏 -->
                <div class="preview-collect">
                    <a class="" href="">
                        <span>★</span>
                        <i class=""></i>收藏
                    </a>
                </div>
            </div>

            <!-- 具体 -->
            <div class="property">
                <!-- 头部 -->
                <div class="property-hd">
                    <h1>${res.title}</h1>
                    <p class="mod-info active">【开学聚惠限时119元】高性能DAC芯片 | 纯净HiFi音质 | 600Ω高阻抗推力 | Type-C 转接线 | 音乐发烧友必备</p>
                </div>

                <!-- 价格 -->
                <div class="property-sell">
                    <div class="property-sell-price">
                        <div>
                            <small>¥</small>
                            <span>${res.price}</span>
                        </div>
                    </div>
                    <!-- 优惠劵 -->
                    <dl class="property-sell-coupon">
                        <dt>
                            <span>优惠券</span>
                        </dt>
                        <dd>
                            <p>
                                <span>满169减50</span></p>
                            <a class="vm-more" href="#">更多 &gt;</a>
                        </dd>
                    </dl>
                </div>

                <div class="property-service">
                    <!-- 服务   -->
                    <dl class="property-service-support">
                        <dt>支
                            <span></span>
                            <span></span>持
                        </dt>



                        <dd>
                            <span class="outside-icon">
                                <span class="iconfont icon-zhengque3-copy-copy">
                                </span> 花呗分期
                            </span>
                            <span class="outside-icon">
                                <span class="iconfont icon-zhengque3-copy-copy">
                                </span>
                                顺丰发货
                            </span>
                            <span class="outside-icon">
                                <span class="iconfont icon-zhengque3-copy-copy">
                                </span>
                                7天无理由退货
                            </span>
                        </dd>
                    </dl>

                    <!--配送-->
                    <dl class="property-service-send">
                        <dt>配送服务</dt>
                        <dd class="">
                            <div class="site-selector">
                                <div class="text">浙江省 杭州市
                                    <span>▼</span>
                                </div>
                            </div>
                        </dd>
                    </dl>

                    <!--供应商-->
                    <div class="property-service-provider">
                        本商品由 魅族 负责发货并提供售后服务
                        <a><span class="iconfont icon-kefu1"></span>
                            <span>商城客服</span></a>
                    </div>
                </div>

                <!-- 相关 -->
                <div class="property-sibling">
                    <dl>
                        <dt>
                            相关产品
                        </dt>
                        <dd>
                            <a href="">HIFI 解码耳放</a>
                            <a href="">开学聚惠</a>
                            <a href=""> LIVE
                                四单元动铁耳机</a>
                        </dd>
                    </dl>
                </div>

                <!-- 颜色 -->
                <div class="property-set">
                    <dl>
                        <dt>颜色分类</dt>
                        <dd>
                            <a>
                                <img src="..${picture[1].src}">
                                <span>黑色</span>
                            </a>
                        </dd>
                    </dl>
                </div>

                <!-- 花呗 -->
                <div class="property-huabei">
                    <div class="vm-metatit">
                        花呗分期
                    </div>

                    <div class="huabei-db">
                        <a>
                            <span class="s1">¥57.62×3期</span>
                            <span class="s2">含手续费 ￥1.29/期</span>
                        </a>
                        <a>
                            <span class="s1">¥29.42×6期</span>
                            <span class="s2">含手续费 ￥1.26/期</span>
                        </a>
                        <a>
                            <span class="s1">¥15.13×12期</span>
                            <span class="s2">含手续费 ￥1.05/期</span>
                        </a>
                    </div>
                </div>


                <!-- 购买 -->
                <div class="property-buy">
                    <dl>
                        <dt>数<span></span><span></span>量
                        </dt>
                        <dd>
                            <div class="mod-control">
                                <a class="throw"> - </a>
                                <input type="text" value="1" id="num" min="1" max="${res.num}" data-max="12" disabled>
                                <a class="plus">+</a>
                            </div>
                        </dd>
                    </dl>


                    <div class="property-buy-action">

                        <a class="buy-btn" href="./register.html">立即购买</a>
                        <input type="button" value="加入购物车" id="additem">
                    </div>
                </div>
            </div>  

            `;

            $('.article').append(template).find('#additem').on('click', function() {
                addItem(res.id, res.price, $('#num').val());
            });
            $('.plus').on('click', function() {
                $('#num').val(function() {
                    let value=parseInt($(this).val()) +1;
                    if(value<1){
                        value=1;
                    }
                    return value;
                })
            });
            $('.throw').on('click', function() {
                $('#num').val(function() {
                    
                    let value=parseInt($(this).val()) -1;
                    if(value<1){
                        value=1;
                    }
                    return value;
                });
            });
            
        }
    });



    function addItem(id, price, num) {
        let shop = cookie.get('shop'); // 从cookie中获取shop数据

        let product = { 
            id: id,
            price: price,
            num: num
        };

        if (shop) { // 判断是否存有购物车数据
            shop = JSON.parse(shop);
            // 购物车中是否已经存在当前这件商品
            if (shop.some(elm => elm.id == id)) {
                // 修改数量
                shop.forEach(elm => {
                    elm.id === id ? elm.num = num : null;
                });
            } else {
                // 添加商品
                shop.push(product);
            }

        } else {
            shop = [];
            shop.push(product);
        }

        cookie.set('shop', JSON.stringify(shop), 1);
    }
})();