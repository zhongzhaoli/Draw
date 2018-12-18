/*
    作者：Custer
    日期：2018.12.18
*/

(function (global, factory) {
    "use strict";
    factory(global, true);
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {

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
    //跳动速度
    let speed = 100;
    //动画定时器
    let active_interval;
    //状态（当前是否在抽奖）
    let status = false;
    //可否转动（几率计算错误不可转动）
    let can_start = false;
    //奖品数量
    let prize_len = 0;
    let admin_num = null;


    //主函数
    let main = function () {
        return this;
    }
    //跳动数量计算函数
    let calculation_num = function () {
        //数组清空
        let num_arr = [];
        //当前循环的范围数
        let to_peace = 0;
        //随机1-1000
        let sj_num = parseInt(Math.random() * 1000);
        //创建一个0-999的数组
        for (let i = 0; i < 1000; i++) {
            num_arr.push(i);
        }
        //打乱数组
        num_arr = num_arr.shuffle(num_arr);
        //获取随机数在数组的位置
        let sj_num_index = num_arr.indexOf(sj_num);
        //循环奖品对象
        for (let i = 0; i < Object.values(Prize).length; i++) {
            //当前循环的值
            let now_values = Object.values(Prize)[i];
            //百分比数量和前几次循环相加 等于范围 奖品1 = 100 奖品2 = 200 奖品1范围 = 0 ～ 99 奖品2范围 = 100 ～ 299
            to_peace = to_peace + now_values;
            //小于多少就是他了
            if (sj_num_index < to_peace) {
                //打印中奖奖品
                console.log(Object.keys(Prize)[i]);
                //返回中奖奖品所在的位置 与跳动数有关
                return Object.keys(Prize).indexOf(Object.keys(Prize)[i]);
            }
        }
    }
    //动画切换中奖项
    let active_anm = function () {
        //跳动多少次（根据几率）
        let probability_num = 0,
            calculation_num_;
        //跳动数量计算
        if (admin_num === null) {
            //获取跳动数
            calculation_num_ = calculation_num();
            //跳动数+1 是因为从0算起 跳动数 + 全部数量*随机数
            probability_num = calculation_num_ + 1 + (prize_len * (parseInt(Math.random() * 3) + 1));
        }
        else {
            probability_num = admin_num + 1 + (prize_len * (parseInt(Math.random() * 3) + 1));
            admin_num = null;
        }
        //active跳到的项
        let now_num = 1;
        //跳动次数 从1开始
        let is_active_num = 1;
        status = true;
        //处理第一次计时器延迟的问题
        let set_fun = function(){
            if (is_active_num === probability_num) {
                clearInterval(active_interval);
                status = false;
            }
            $(".active").removeClass("active");
            let all_num = Object.keys(Prize).length;
            //最后一个亮，要跳到第一个
            $(".draw_big_div").children().eq(now_num - 1).addClass("active");
            if (now_num === all_num) {
                now_num = 1;
            }
            else {
                //index 从0开始 所以加1 然后下一个div active所以再加1
                now_num = $(".active").index() + 1 + 1;
            }
            is_active_num++;
        }
        //运行
        set_fun();
        //speed后再运行
        active_interval = setInterval(function () {
            set_fun();
        }, speed);
    }
    probability_calculation = function () {
        let probability_ = 0;
        //几率份数是否1000
        for (let i in Prize) {
            probability_ += Prize[i];
        }
        //如果几率粉水不等于1000 则不给开始
        if (probability_ != 1000) {
            alert("几率计算错误");
            can_start = false;
            return false;
        }
        can_start = true;
        return true;
    }
    //初始化 渲染
    main.prototype.init = function () {
        if (probability_calculation()) {
            //生成div
            for (let i in Prize) {
                $("<div class='draw_div' data-probability=" + Prize[i] + ">" + i + "</div>").appendTo($(".draw_big_div"));
            }
            //奖品数量
            prize_len = Object.keys(Prize).length;
        }
    }
    //开始按钮触发
    main.prototype.start = function () {
        if (!status && can_start) {
            active_anm();
        }
    }
    main.prototype.admin = function (num) {
        admin_num = num - 1;
        return "设置成功";
    }

    Array.prototype.shuffle = function (arr) {
        //数组打乱 随机两个数 互相调换
        for (let i = 0; i < arr.length; i++) {
            let first_ran = parseInt(Math.random() * arr.length);
            let secound_ran = parseInt(Math.random() * arr.length);
            let num_one = arr[first_ran];
            arr[first_ran] = arr[secound_ran];
            arr[secound_ran] = num_one;
        }
        return arr;
    }
    var Draw = new main();
    window.Draw = Draw;
});
