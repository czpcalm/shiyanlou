var canvas = document.createElement("canvas");
canvas.width = 512;  //万万不可写成canvas.style.width
canvas.height = 480;
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");

//加载背景
var bgImg = new Image();
var bgReady = false;
bgImg.src = "images/background.png";
bgImg.onload = function () {
    bgReady = true;
}

//加载人物图片
var heroImg = new Image();
var heroReady = false;
heroImg.src = "images/hero.png";
heroImg.onload = function () {
    heroReady = true;
}

//加载怪物图片
var monsterImg = new Image();
var monsterReady = false;
monsterImg.src = "images/monster.png";
monsterImg.onload = function () {
    monsterReady = true;
}

//人物属性，具有256的速度
var hero = {
    speed: 256,
};

var monster = {}; //怪物对象
var monstersCaught = 0; //被抓住的怪物数量


var keysDown = {}; //记录按下的按键

// 监听键盘按下
addEventListener(
    "keydown",
    function (e) {
        keysDown[e.keyCode] = true;
    },
    false
);

// 监听键盘松起
addEventListener(
    "keyup",
    function (e) {
        delete keysDown[e.keyCode];
    },
    false
);

//重置游戏
var reset = function () {
    // 把人物置于中间
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;
    // 随机放置怪物
    monster.x = 32 + Math.random() * (canvas.width - 64);
    monster.y = 32 + Math.random() * (canvas.height - 64);
};

//更新游戏状态
var update = function (modifier) {
    var move = hero.speed * modifier;
    // 根据按键移动人物，上下左右分别对应的keyCode为38,40,37,39
    if (38 in keysDown) {
        hero.y -= move;
    }
    if (40 in keysDown) {
        hero.y += move;
    }
    if (37 in keysDown) {
        hero.x -= move;
    }
    if (39 in keysDown) {
        hero.x += move;
    }

    //检测是否抓到怪物
    if (Math.abs(hero.x - monster.x) < 32 &&
        Math.abs(hero.y - monster.y) < 32) {
        monstersCaught++;
        reset();
    }

};

//绘制方法
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImg, 0, 0);
    }

    if (heroReady) {
        ctx.drawImage(heroImg, hero.x, hero.y);
    }

    if (monsterReady) {
        ctx.drawImage(monsterImg, monster.x, monster.y);
    }
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Goblins caught: "+monstersCaught, 32,32);
    
};

// 游戏运行
var main = function(){
    var now = Date.now();

    var delta = now - then;  // 时间差
    update(delta/1000);
    render();
    then = now;
    requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame ||
    w.webkitRequestAnimationFrame ||
    w.msRequestAnimationFrame ||
    w.mozRequestAnimationFrame;

// 开始游戏
var then = Date.now();
reset();
main();