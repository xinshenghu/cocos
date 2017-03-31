var allSprite = [];
var size = cc.winSize;
var ox, oy;
var index = 100;


var pintuLayer = cc.Layer.extend({
    sprite: null,
    ctor: function () {

        this._super();

        allSprite = [];
        index = 100;

        //var a = new spritepintu(res.p2);
        //var p = res.p2;
        //a.p = p;
        //a.setScale(0.5);
        //a.setPosition(size.width / 2, size.height / 2);

        //this.addChild(a)

        this.create();

        //重新开始
        var back = new backLayer();
        this.addChild(back);


        return true;
    },

    create: function () {

        var x1 = size.width / 4;
        var y1 = 650;

        //jian li 9 jing ling
        var p1 = new spritepintu(res.p1);
        p1.p1 = 1;
        var p2 = new spritepintu(res.p2);
        p2.p1 = 2;
        var p3 = new spritepintu(res.p3);
        p3.p1 = 3;
        var p4 = new spritepintu(res.p4);
        p4.p1 = 4;
        var p5 = new spritepintu(res.p5);
        p5.p1 = 5;
        var p6 = new spritepintu(res.p6);
        p6.p1 = 6;
        var p7 = new spritepintu(res.p7);
        p7.p1 = 7;
        var p8 = new spritepintu(res.p8);
        p8.p1 = 8;
        var p9 = new spritepintu(res.p9);
        p9.p1 = 9;

        var tmp = [p1, p2, p3, p4, p5, p6, p7, p8, p9];
        var p = 0;

        for (var i = 1; i < 4; i++) {
            for (var j = 1; j < 4; j++) {
                var d = Math.floor(Math.random(1) * tmp.length); //随机数
                tupian = tmp[d];
                tupian.setPosition(x1, y1);
                tupian.p2 = p++;
                this.addChild(tupian);
                //console.log(tupian.p2);
                allSprite.push(tupian)

                //tmp.pop(tupian);

                var arr = [];
                for (var i1 = 0; i1 < tmp.length; i1++) {
                    if (tmp[i1] != tmp[d])
                        arr.push(tmp[i1]);
                }
                tmp = arr;


                x1 = x1 + tupian.width;
            }

            x1 = size.width / 4;
            y1 = y1 - tupian.height;
        }


    }


});

var pintuScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new pintuLayer();
        this.addChild(layer);
    }
});

var spritepintu = cc.Sprite.extend({
    p1: null,
    p2: null,
    ctor: function (p) {
        this._super(p);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded,

        }, this);

    }
    ,
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();

        var locationInNode = target.convertToNodeSpace(touch.getLocation());

        var s = target.getContentSize();

        var rect = cc.rect(0, 0, s.width, s.height);

        if (cc.rectContainsPoint(rect, locationInNode)) {

            ox = target.x;
            oy = target.y;
            target.setLocalZOrder(index++);

            return true;
        }

        return false;
    }
    ,
    onTouchMoved: function (touch, event) {
        var target = event.getCurrentTarget();
        target.setPosition(touch.getLocation());

    }
    ,
    onTouchEnded: function (touch, event) {
        var target = event.getCurrentTarget();


        //yin wei pop suo yi xu yao pai xu
        //for (i = 0; i < allSprite.length-1; i++) {
        //    for (j = i + 1; j < allSprite.length; j++) {
        //        if (allSprite[i].p2 > allSprite[j].p2) {
        //            tempa = allSprite[i];
        //            allSprite[i] = allSprite[j];
        //            allSprite[j] = tempa;
        //        }
        //
        //    }
        //}


        //peng zhuang jian ce
        var arrsprite = [];
        for (i = 0; i < allSprite.length; i++) {

            if (cc.rectIntersectsRect(target, allSprite[i]) && target != allSprite[i]) {
                arrsprite.push(allSprite[i]);


            }

        }


        if (arrsprite.length > 0) {
            var a11 = arrsprite[0];
            for (i = 0; i < arrsprite.length; i++) {
                //console.log(arrsprite[i].p2);
                if (arrsprite[i].p2 < a11.p2)//找出最小元素给a[0]
                {
                    a11 = arrsprite[i];
                }

            }


            x = a11.x;
            y = a11.y;
            a11.x = ox;
            a11.y = oy;
            target.x = x;
            target.y = y;


            //console.log(target.p2);
            //console.log(a11.p2);
            var p = target.p2;

            target.p2 = a11.p2;

            a11.p2 = p

            //console.log(target.p2);
            //console.log(target.p1-1);
            //console.log(a11.p2);

            //jian ce jie shu
            for (i = 0; i < allSprite.length; i++) {
                //console.log(allSprite[i].p1+" "+allSprite[i].p2);
                if (allSprite[i].p1-1 != allSprite[i].p2) {
                    return;
                }

            }


            cc.director.runScene(new scenesuccess());

        }
        target.x = ox;
        target.y = oy;


    }


});



