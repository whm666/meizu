(function () {
    $.ajax({
        type: "get",
        url: "../../interface/getproduct.php",
        dataType: "json",
        
        success: function (res) {
            let temp = '';
            res.forEach((elm, i) => {  
                // console.log(elm.picture)
                let picture = JSON.parse(elm.picture);
                // console.log(picture);
                temp += `<li class="hs-l item">
                    <a href="./detail.html?id=${elm.id}"> <img src="..${picture[0].src}">
                        <span class="p-wrap ">
                            <span class="p-name">
                                ${elm.title}
                            </span>
                            <span class="p-adv">
                                高性能DAC芯片|纯净HiFi音质|600Ω高阻抗推力</span>
                            <span class="p-pay">
                                <i>￥</i>${elm.price}
                            </span>
                        </span>
                    </a>
            </li>`;
            });
            // console.log(res)
            
            $('.list').append(temp);
        }
    });
})();