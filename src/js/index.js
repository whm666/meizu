import  './library/jquery.js'
import './carousel.js'
import './pro.js'
import './register.js'

$(function(){
    $("#mz-show").carousel({
        carousel : ".show-list",//轮播图容器
        indexContainer : ".img-index",//下标容器
        timing : 5000,//自动播放间隔
        animateTime : 500,//动画时间
        autoPlay : true,//是否自动播放 true/false
        direction : "left",//滚动方向 right/left
    });
});

