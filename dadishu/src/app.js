var size = null;
BUTTON_COUNT = 16;
SQUARE_ROOT = Math.sqrt(BUTTON_COUNT);
PART_COUNT = 2 * Math.sqrt(BUTTON_COUNT) + 1;
var btn = [];
var quyu = [];

var count = 0;
//step = "";
var helloLabel1;

//共有的对象
var fenshu = null;
var jishi = null;
//var HelloWorldLayer;


var HelloWorldLayer = cc.Layer.extend({
    sprite: null,

    ctor: function () {

        this._super();

        size = cc.winSize;

        //背景
        var bg = cc.Sprite.create(res.bg);
        bg.setScale(2);
        bg.setPosition(size.width / 2, size.height / 2);
        this.addChild(bg, 0);

        //计时
        jishi = new spritetimer();
        jishi.setPosition(120, size.height - 50);
        this.addChild(jishi);

        //几分
        fenshu = new spritefenshu();
        fenshu.setPosition(420, size.height - 50);
        this.addChild(fenshu);

        //重新开始
        var back = new backLayer();
        this.addChild(back);

        //地鼠的精灵我要给个随机位置show出来。时间可以是固定的。这里要给一个开始停止，
        this.schedule(this.do, 1);


        return true;
    },
    do: function () {
        var a = new spriteMy();
        var x = Math.random() * size.width;
        var y = Math.random() * size.height;
        if (y < 200) {
            y = 200;
        } else if (y > 750) {
            y = 750;
        }
        a.setPosition(x, y
        );
        this.addChild(a);
    },
    undo: function () {
        this.unscheduleAllCallbacks();
        //this.schedule(this.onUnscheduleAll, 4);
        //this.unschedule(this.do);
    }
});


var layer1;
var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new HelloWorldLayer();
        layer1 = layer;
        this.addChild(layer);

        //cc.director.setClearColor(cc.color("7e","20","ff",255));
    }
});

//地鼠精灵
var spriteMy = cc.Sprite.extend({
    Tag: 0,
    Text: 0,
    ctor: function () {
        this._super(res.zhuankuai);
        //color = new cc.Color(181, 114, 228);
        //this.setColor(color);

        this.schedule(this.do, 1);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan

        }, this);

    },

    do: function () {

        this.removeFromParent();
    },

    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();

        var locationInNode = target.convertToNodeSpace(touch.getLocation());

        var s = target.getContentSize();

        var rect = cc.rect(0, 0, s.width, s.height);
        if (cc.rectContainsPoint(rect, locationInNode)) {

            fenshu.fen++;
            fenshu.settext();

            this._texture1 = cc.textureCache.addImage(res.xuanyun);
            target.texture = this._texture1;

            if (CheckForWin() == true) {
                //WonTheGame();
                jishi.unscheduleAllCallbacks();
                layer1.unscheduleAllCallbacks();

                var label = new cc.Sprite(res.finish);
                label.setScale(2);
                var size = cc.winSize;
                layer1.addChild(label);
                label.attr({
                    x: size.width / 2,
                    y: 0,

                });

                label.runAction(
                    cc.moveTo(2, cc.p(size.width / 2, size.height / 2))
                );

                layer1.scheduleOnce(function () {


                    cc.director.runScene(new HelloWorldScene());
                }, 3);
            }
        }
    },


    addtext: function (i) {

        var helloLabel = new cc.LabelTTF(i + "", "Arial", 20);
        helloLabel.setColor(cc.color.WHITE);
        helloLabel.x = this.width / 2;
        helloLabel.y = this.height / 2;

        this.addChild(helloLabel);

    }

});

function ChangeButtonPosition(target) {
    {
        for (var m = 0; m < btn.length; m++) {

            if (target.hang + 1 == btn[m].hang && target.lie == btn[m].lie && btn[m].Text == "0") {
                hang = btn[m].hang;
                lie = btn[m].lie;

                btn[m].hang = target.hang;
                btn[m].lie = target.lie;

                target.hang = hang;
                target.lie = lie;

                quyunode = btn[m].getPosition();
                btn[m].setPosition(target.getPosition().x, target.getPosition().y);
                target.setPosition(quyunode.x, quyunode.y);

                count++;
                helloLabel1.setString("移动次数：" + count);

            } else if (target.hang - 1 == btn[m].hang && target.lie == btn[m].lie && btn[m].Text == "0") {
                hang = btn[m].hang;
                lie = btn[m].lie;

                btn[m].hang = target.hang;
                btn[m].lie = target.lie;

                target.hang = hang;
                target.lie = lie;

                quyunode = btn[m].getPosition();
                btn[m].setPosition(target.getPosition().x, target.getPosition().y);
                target.setPosition(quyunode.x, quyunode.y);

                count++;
                helloLabel1.setString("移动次数：" + count);

            } else if (target.hang == btn[m].hang && target.lie - 1 == btn[m].lie && btn[m].Text == "0") {
                hang = btn[m].hang;
                lie = btn[m].lie;

                btn[m].hang = target.hang;
                btn[m].lie = target.lie;

                target.hang = hang;
                target.lie = lie;

                quyunode = btn[m].getPosition();
                btn[m].setPosition(target.getPosition().x, target.getPosition().y);
                target.setPosition(quyunode.x, quyunode.y);

                count++;
                helloLabel1.setString("移动次数：" + count);

            }
            else if (target.hang == btn[m].hang && target.lie + 1 == btn[m].lie && btn[m].Text == "0") {
                hang = btn[m].hang;
                lie = btn[m].lie;

                btn[m].hang = target.hang;
                btn[m].lie = target.lie;

                target.hang = hang;
                target.lie = lie;

                quyunode = btn[m].getPosition();
                btn[m].setPosition(target.getPosition().x, target.getPosition().y);
                target.setPosition(quyunode.x, quyunode.y);

                count++;
                helloLabel1.setString("移动次数：" + count);

            }
        }


    }
}

function CheckForWin() {

    if (fenshu.fen > 5) {
        return true;

    } else {
        return false;
    }

}

function WonTheGame() {
    //cc.director.runScene(new scenesuccess());
    var label = new cc.Sprite(res.finish);
    label.setScale(2);
    var size = cc.winSize;
    layer1.addChild(label);
    label.attr({
        x: size.width / 2,
        y: 0,

    });

    jishi.unscheduleAllCallbacks();
    layer1.unscheduleAllCallbacks();

    label.runAction(
        cc.moveTo(2, cc.p(size.width / 2, size.height / 2))
    );




}



