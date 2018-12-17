(function(global, factory){
	"use strict";
    factory(global, true);
})(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

    //奖品几率 以1000来计算分数 1% = 10 0.1% = 1
    let Prize = {
        "奖品1": 100,
        "奖品2": 200,
        "奖品3": 10,
        "奖品4": 1,
        "奖品5": 199,
        "奖品8": 400,
        "奖品9": 20,
        "奖品10": 30,
        "奖品11": 10,
        "奖品23": 30,
    }
    //跳动多少次（根据几率）
    let probability_num = 20;
    //速度
    let speed = 100;
    //动画定时器
    let active_interval;
    //状态
    let status = false;
    //可否转动
    let can_start = false;
    

    //主函数
    let main = function(){
        return this;
    }
    //动画切换中奖项
    let active_anm = function(){
        //active跳到的项
        let now_num = 1;
        //跳动次数 从1开始
        let is_active_num = 1;
        status = true;
        active_interval = setInterval(function(){
            if(is_active_num === probability_num){
                clearInterval(active_interval);
                status = false;
            }
            $(".active").removeClass("active");
            let all_num = Object.keys(Prize).length;
            let need_active = 0;
            //最后一个亮，要跳到第一个
            $(".draw_big_div").children().eq(now_num - 1).addClass("active");
            if(now_num === all_num){
                now_num = 1;
            }
            else{
                //index 从0开始 所以加1 然后下一个div active所以再加1
                now_num = $(".active").index() + 1 + 1;
            }
            is_active_num++;
        }, speed);
    }
    probability_calculation = function(){
        let probability_ = 0;
        //几率份数是否1000
        for(let i in Prize){
            probability_ += Prize[i];
        }
        if(probability_ != 1000){
            alert("几率计算错误");
            can_start = false;
            return false;
        }
        can_start = true;
        return true;
    }
    main.prototype.init = function(){
        if(probability_calculation()){
            //生成div
            for(let i in Prize){
                $("<div class='draw_div' data-probability="+ Prize[i]  +">"+ i +"</div>").appendTo($(".draw_big_div"));
            }
        }
    }
    main.prototype.start = function(){
        if(!status && can_start){
            active_anm();
        }
    }
    var Draw = new main();
    window.Draw = Draw;
});
