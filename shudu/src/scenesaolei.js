var allSprite = [];
var leis = [];

var ox, oy;
var index = 100;
var xuanzhongjiedian = null;
var quyuall = [];
var layerall = null;
var jishi = null;
var shuliang = 4;

var caozuo = {
    gethang: function (i) {
        return leis[i];
    }
    ,
    getlie: function (i) {
        ls = [];
        for (var m = 0; m < 9; m++) {
            ls.push(leis[m][i]);
        }
        return ls;
    }
    ,
    getquyu: function (i, j) {

        if (i < 3 && j < 3) {
            //this.quyu.push(leis[i][j]);
            return quyuall[0];
        } else if (i < 6 && j < 3) {
            return quyuall[1];

        }
        else if (i < 9 && j < 3) {
            return quyuall[2];

        }
        else if (i < 3 && j < 6) {
            return quyuall[3];

        }
        else if (i < 6 && j < 6) {
            return quyuall[4];

        }
        else if (i < 9 && j < 6) {
            return quyuall[5];

        }
        else if (i < 3 && j < 9) {
            return quyuall[6];
        }
        else if (i < 6 && j < 9) {
            return quyuall[7];
        }
        else if (i < 9 && j < 9) {
            return quyuall[8];
        }


    }
};

var pintuLayer = cc.Layer.extend({
    sprite: null,
    temp2: [],
    tempall: [],
    text: 0,
    flaghang: true,
    yihangcishu: 0,
    jieguohang: [],
    quyu: [],


    ctor: function () {

        this._super();
        var size = cc.winSize;
        //添加背景图片
        var bg = cc.Sprite.create(res.bg);
        bg.setScale(4);
        bg.setPosition(size.width / 2, size.height / 2);
        this.addChild(bg, 0);

        allSprite = [];
        leis = [];

        this.create();

        //重新开始
        var back = new backLayer();
        this.addChild(back);

        return true;
    },
    create: function () {
        var size = cc.winSize;
        //计时
        jishi = new spritetimer();
        jishi.setPosition(size.width / 2, size.height - 50);
        this.addChild(jishi);

        //建造表格
        var x1 = size.width / 9;
        var y1 = 1000;
        var startx = x1;
        var starty = y1;
        for (var i = 0; i < 9; i++) {
            var ls = [];
            for (var j = 0; j < 9; j++) {
                var tupian = new spritesaolei();
                //tupian.setScale(2);
                tupian.hang = i;
                tupian.lie = j;
                ls.push(tupian);
                tupian.setPosition(x1, y1);
                tupian.setScale(1.5);
                this.addChild(tupian);
                x1 = x1 + tupian.getBoundingBox().width;
                //console.log(tupian.getBoundingBox().width);
                allSprite.push(tupian);

                if ((i + 1) % 3 == 0 && (j + 1) % 3 == 0) {
                    var Draw = new cc.DrawNode();
                    Draw.drawRect(
                        cc.p(startx - tupian.getBoundingBox().width / 2, starty + tupian.getBoundingBox().height / 2), // 起点
                        cc.p(x1 + -tupian.getBoundingBox().width / 2, y1 - tupian.getBoundingBox().height / 2), // 起点的对角点
                        null, // 填充颜色
                        5, // 线粗
                        cc.color(89, 89, 89) // 线颜色
                    );
                    this.addChild(Draw);
                    //var startx = x1;
                    //var starty = y1;
                }

            }
            leis.push(ls);
            x1 = size.width / 9;
            y1 = y1 - tupian.getBoundingBox().height;

            //console.log(this.tempall);

        }

        //建造操作
        var x2 = size.width / 9;
        var y2 = 500;
        var back1 = cc.MenuItemFont.create("显示答案", this.clickCallback1, this);
        //back1.setPosition(0, 0);
        back1.setColor(cc.color.RED);
        back1.setScale(1);
        var menu = new cc.Menu();
        menu.addChild(back1);
        menu.setPosition(size.width - 100, 200);
        this.addChild(menu);
        var x3 = size.width / 9;
        var y3 = 420;
        var num1 = 1;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var tupian = new spriteanjian();
                tupian.setScale(2);
                tupian.setPosition(x3, y3);
                tupian.addtext(num1)
                tupian.number = num1;
                num1++;
                this.addChild(tupian);
                x3 = x3 + tupian.getBoundingBox().width;

            }
            x3 = size.width / 9;
            y3 = y3 - tupian.getBoundingBox().height;
        }


        while (true) {
            if (this.tempall.length >= 9) {
                break;
            }
            //console.log(this.tempall);
            this.createall();
        }

        for (var i = 0; i < 9; i++) {
            quyuall[i] = [];

        }

        //创建区域
        //this.quyu = [];
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (i < 3 && j < 3) {
                    //this.quyu.push(leis[i][j]);
                    quyuall[0].push(leis[i][j]);
                } else if (i < 6 && j < 3) {
                    quyuall[1].push(leis[i][j]);

                }
                else if (i < 9 && j < 3) {
                    quyuall[2].push(leis[i][j]);

                }
                else if (i < 3 && j < 6) {
                    quyuall[3].push(leis[i][j]);

                }
                else if (i < 6 && j < 6) {
                    quyuall[4].push(leis[i][j]);

                }
                else if (i < 9 && j < 6) {
                    quyuall[5].push(leis[i][j]);

                }
                else if (i < 3 && j < 9) {
                    quyuall[6].push(leis[i][j]);
                }
                else if (i < 6 && j < 9) {
                    quyuall[7].push(leis[i][j]);
                }
                else if (i < 9 && j < 9) {
                    quyuall[8].push(leis[i][j]);
                }
            }
        }
        //console.log(quyuall);

        //随机隐藏
        //shuliang = 5;
        for (var i = 0; i < 9; i++) {
            var temp1 = [1, 2, 3, 4, 5, 6, 7, 8, 0];
            for (var j = 0; j < shuliang; j++) {
                var r = Math.floor(Math.random() * temp1.length);
                quyuall[i][temp1[r]].show = false;
                temp1.remove(r);
            }
        }

        //添加文字
        //this.createall();
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (leis[i][j].show == true) {
                    leis[i][j].addtext(this.tempall[i][j]);
                    leis[i][j].numbershow = this.tempall[i][j];
                } else {
                    leis[i][j].addtext("");
                }
                leis[i][j].number = this.tempall[i][j];
            }
        }


    },
    createall: function () {
        this.tempall = [];
        this.jieguohang = [];
        for (var i = 0; i < 9; i++) {
            this.temp2 = [];
            this.createnumberhang(i);
        }

    }
    ,
    createnumberhang: function (i) {

        var temp1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.temp2 = [];

        for (var j = 0; j < 9; j++) {
            this.createnumber(i, j, temp1.clone());

            for (var i1 = 0; i1 < temp1.length; i1++) {
                if (temp1[i1] == this.text) {
                    temp1.remove(i1);
                }
            }
        }
        //this.tempall.push(this.temp2.clone());

        if (!this.jieguohang.exists(i))
            this.tempall.push(this.temp2.clone());
        this.jieguohang.push(i);

        return;

    }
    ,
    //getquyuall: function () {
    //
    //}
    //,
    getquyu: function (i, j) {
        var m1, m2, n1, n2;

        if (i < 3 && j < 3) {
            m1 = 0;
            m2 = 2;
            n1 = 0;
            n2 = 2;
        } else if (i < 6 && j < 3) {
            m1 = 3;
            m2 = 5;
            n1 = 0;
            n2 = 2;

        }
        else if (i < 9 && j < 3) {
            m1 = 6;
            m2 = 8;
            n1 = 0;
            n2 = 2;

        }
        else if (i < 3 && j < 6) {
            m1 = 0;
            m2 = 2;
            n1 = 3;
            n2 = 5;

        }
        else if (i < 6 && j < 6) {
            m1 = 3;
            m2 = 5;
            n1 = 3;
            n2 = 5;

        }
        else if (i < 9 && j < 6) {
            m1 = 6;
            m2 = 8;
            n1 = 3;
            n2 = 5;

        }
        else if (i < 3 && j < 9) {
            m1 = 0;
            m2 = 2;
            n1 = 6;
            n2 = 8;
        }
        else if (i < 6 && j < 9) {
            m1 = 3;
            m2 = 5;
            n1 = 6;
            n2 = 8;
        }
        else if (i < 9 && j < 9) {
            m1 = 6;
            m2 = 8;
            n1 = 6;
            n2 = 8;
        }
        this.quyu = [];
        for (var m = m1; m <= m2; m++) {
            for (var n = n1; n <= n2; n++) {
                if (this.tempall[m] && this.tempall[m][n]) {
                    this.quyu.push(this.tempall[m][n]);

                }

            }
        }

    }
    ,
    createnumber: function (i, j, temp) {
        if (temp.length == 0) {
            //this.temp2 = [];
            //this.flaghang=false;
            this.yihangcishu++;

            if (this.yihangcishu > 300) {
                this.tempall.pop();
                this.yihangcishu = 0;
                this.createnumberhang(i - 1);
            }
            //console.log(this.tempall);
            this.createnumberhang(i);
            return false;
        }

        var count1 = Math.floor(Math.random() * temp.length);
        var text1 = temp[count1];
        //var flag = true;

        //判断区域
        this.getquyu(i, j);
        if (this.quyu.exists(text1)) {
            temp.remove(count1);
            this.createnumber(i, j, temp);
            return false;
        }

        //判断上面的
        for (var m = i - 1; m >= 0; m--) {
            if (this.tempall[m] && this.tempall[m][j] == text1) {
                temp.remove(count1);
                this.createnumber(i, j, temp);
                //flag = false;
                return false;
            }
        }
        this.text = text1;
        this.temp2.push(text1);
    }
    ,
    clickCallback1: function () {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (leis[i][j].show == false) {
                    leis[i][j].children[0].setString(leis[i][j].number);
                    leis[i][j].children[0].setColor(cc.color.RED);
                    leis[i][j].show = true;

                }

            }
        }
        //cc.director.runScene(new pintuScene());
        jishi.undo();
    }
});

var pintuScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new pintuLayer();
        layerall = layer;
        this.addChild(layer);
    }
});

var spritesaolei = cc.Sprite.extend({
    islei: 0,
    isdiankai: 0,
    number: 0,
    numbershow: 0,
    show: true,
    hang: 0,
    lie: 0,

    ctor: function () {
        this._super(res.zhuankuai);
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan
        }, this);

        this.setScale(3);
    }
    ,
    //tintGreen: cc.tintBy(0.5, -255, 0, -255),
    flagxuanzhong: false,
    flagcanedit: false,

    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var s = target.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);
        if (cc.rectContainsPoint(rect, locationInNode)) {
            if (!target.show) {
                if (!xuanzhongjiedian || xuanzhongjiedian != target) {
                    target.flagxuanzhong = true;
                    var delay = cc.delayTime(0.1);
                    var tintGreen = cc.tintBy(0.1, -255, 0, -255);
                    var green = cc.sequence(tintGreen, delay.clone()).repeat(1);
                    target.runAction(green);
                }
                if (xuanzhongjiedian && xuanzhongjiedian != target) {
                    var delay = cc.delayTime(0.1);
                    var tintGreen = cc.tintBy(0.1, -255, 0, -255);
                    var tintGreenBack = tintGreen.reverse();
                    var green1 = cc.sequence(tintGreenBack, delay.clone()).repeat(1);
                    xuanzhongjiedian.runAction(green1);

                }
                xuanzhongjiedian = target;
            }

        }

        //panduan cheng gong
        for (var i = 0; i < allSprite.length; i++) {
            if (allSprite[i].islei == 0 && allSprite[i].isdiankai == 0) {
                return;

            }
        }

        cc.director.runScene(new scenesuccess());

    },

    addtext: function (i) {
        var helloLabel = new cc.LabelTTF(i + "", "Arial", 38);
        helloLabel.setColor(cc.color.BLACK);
        helloLabel.x = this.width / 2;
        helloLabel.y = this.height / 2;
        this.addChild(helloLabel);
    }


});

var spriteanjian = cc.Sprite.extend({

    number: 0,
    show: true,
    ctor: function () {
        this._super(res.zhuankuai);
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan
        }, this);
    }
    ,
    flagxuanzhong: false,
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var s = target.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);
        if (cc.rectContainsPoint(rect, locationInNode)) {
            if (xuanzhongjiedian) {
                var ls = [];
                ls = caozuo.gethang(xuanzhongjiedian.hang);
                for (var i = 0; i < 9; i++) {
                    if (ls[i].numbershow != 0 && ls[i].numbershow == target.number) {
                        var delay = cc.delayTime(0.1);
                        var tintRed = cc.tintBy(0.1, 0, -255, -255);
                        var tintRedBack = tintRed.reverse();
                        var green = cc.sequence(tintRed, delay.clone(), tintRedBack).repeat(1);
                        ls[i].runAction(green);
                        return false;

                    }

                }
                ls = caozuo.getlie(xuanzhongjiedian.lie);
                for (var i = 0; i < 9; i++) {
                    if (ls[i].numbershow != 0 && ls[i].numbershow == target.number) {
                        var delay = cc.delayTime(0.1);
                        var tintRed = cc.tintBy(0.1, 0, -255, -255);
                        var tintRedBack = tintRed.reverse();
                        var green = cc.sequence(tintRed, delay.clone(), tintRedBack).repeat(1);
                        ls[i].runAction(green);
                        return false;

                    }

                }
                ls = caozuo.getquyu(xuanzhongjiedian.hang, xuanzhongjiedian.lie);
                for (var i = 0; i < 9; i++) {
                    if (ls[i].numbershow != 0 && ls[i].numbershow == target.number) {
                        var delay = cc.delayTime(0.1);
                        var tintRed = cc.tintBy(0.1, 0, -255, -255);
                        var tintRedBack = tintRed.reverse();
                        var green = cc.sequence(tintRed, delay.clone(), tintRedBack).repeat(1);
                        ls[i].runAction(green);
                        return false;

                    }

                }

                xuanzhongjiedian.children[0].setString("");
                xuanzhongjiedian.children[0].setString(target.number);
                xuanzhongjiedian.children[0].setColor(cc.color.BLUE);
                xuanzhongjiedian.numbershow = target.number;

                //panduan cheng gong
                for (var i = 0; i < allSprite.length; i++) {
                    //if (allSprite[i].number != allSprite[i].numbershow) {
                    //    return false;
                    //
                    //}
                    if (allSprite[i].numbershow == 0) {
                        return false;
                    }
                }
                var a = new cc.Sprite(res.finish);

                a.setPosition(
                    550,
                    300
                );
                a.setScale(0.5);
                layerall.addChild(a);
                jishi.undo();
            }


            //target.drawRect(color.GREEN);
            //if (target.islei == 1) {
            //    //target.setTexture(res.lei);
            //    target.showall();
            //}
            //else {
            //    target.setColor(color.GREEN);
            //
            //}

            //return true;
        }

        //panduan cheng gong
        for (var i = 0; i < allSprite.length; i++) {
            if (allSprite[i].islei == 0 && allSprite[i].isdiankai == 0) {
                return;

            }
        }

        cc.director.runScene(new scenesuccess());

    },
    addtext: function (i) {
        var helloLabel = new cc.LabelTTF(i + "", "Arial", 38);
        helloLabel.setColor(cc.color.BLACK);
        helloLabel.x = this.width / 2;
        helloLabel.y = this.height / 2;
        this.addChild(helloLabel);
    }


});





var spritetimer = cc.Sprite.extend({
    fen: 0,
    time: 0,
    helloLabel: null,
    ctor: function () {
        this._super();
        //this.schedule();
        this.helloLabel = new cc.LabelTTF("" + this.time, "Arial", 38);
        this.helloLabel.setColor(cc.color.WHITE);
        this.addChild(this.helloLabel);
        this.schedule(this.do, 1);

    },
    do: function () {
        this.time++;
        if (this.time == 60) {
            this.fen++;
            this.time = 0;
        }
        this.helloLabel.setString(this.fen + "分" + this.time + "秒");
    },
    undo: function () {
        this.unscheduleAllCallbacks();
        //this.schedule(this.onUnscheduleAll, 4);
        //this.unschedule(this.do);
    }
});
