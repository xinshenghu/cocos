BUTTON_COUNT = 16;
SQUARE_ROOT = Math.sqrt(BUTTON_COUNT);
PART_COUNT = 2 * Math.sqrt(BUTTON_COUNT) + 1;
var btn = [];
var quyu = [];

var count = 0;
//step = "";
var helloLabel1;

var HelloWorldLayer = cc.Layer.extend({
    sprite: null,

    ctor: function () {

        this._super(cc.color(0, 0, 255, 255));

        var size = cc.winSize;

        var left = 100;
        var top = 800;

        var hang = 0;
        var lie = 0;

        for (var i = 0; i < BUTTON_COUNT; i++) {

            btn[i] = new spriteMy();
            btn[i].addtext(16 - (i + 1));
            //用text判断是否是隐藏的 text==16
            btn[i].Text = 16 - (i + 1);


            //还需要记住上下左右的点才能交换


            if (i % 4 == 0) {
                left = 100;
                top = top - btn[i].height * 2;
                hang++;
                lie = 1;

            } else {
                left = left + btn[i].width * 2;
                lie++;
            }


            btn[i].hang = hang;
            btn[i].lie = lie;

            btn[i].Left = left;
            btn[i].Top = top;


            btn[i].setPosition(btn[i].Left, btn[i].Top);
            //btn[i].BackColor = Color.SeaGreen;
            //btn[i].Text = Convert.ToString(i + 1);
            //btn[i].Click += new EventHandler(btn_Click); //给按钮添加事件
            //btn[i].Tag = 0;
            //this.Controls.Add(btn[i]);
            btn[i].setScale(2);

            if (i == 15) {
                btn[i].setVisible(false);

            }

            this.addChild(btn[i]);
        }


        var helloLabel = new cc.LabelTTF("请移动到正确位置 1-15", "Arial", 25);
        helloLabel.x = 230;
        helloLabel.y = size.height - 30;

        this.addChild(helloLabel, 1);

        helloLabel1 = new cc.LabelTTF("移动次数：", "Arial", 25);
        helloLabel1.x = 230;
        helloLabel1.y = size.height - 600;

        this.addChild(helloLabel1, 1);


        //重新开始
        var back = new backLayer();
        this.addChild(back);

        return true;
    }
});

colorSprite = function (size, color) {
    var render = new cc.RenderTexture(size.width, size.height);
    render.beginWithClear(color.r, color.g, color.b, color.a);
    render.visit();
    render.end();
    return new cc.Sprite(render.getSprite().texture);
};


var layer1;
var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new HelloWorldLayer();
        layer1 = layer;
        this.addChild(layer);

        cc.director.setClearColor(cc.color("7e","20","ff",255));
    }
});


var spriteMy = cc.Sprite.extend({
    Tag: 0,
    Text: 0,
    ctor: function () {
        this._super(res.zhuankuai);
        color = new cc.Color(181, 114, 228);
        this.setColor(color);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan

        }, this);

    }
    ,

    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();

        var locationInNode = target.convertToNodeSpace(touch.getLocation());

        var s = target.getContentSize();

        var rect = cc.rect(0, 0, s.width, s.height);
        if (cc.rectContainsPoint(rect, locationInNode)) {

            //alert(target.Text);

            //i = target.Text - 1;
            ChangeButtonPosition(target); //被点击的按钮


            //step += (i + 1) + " ";

            if (CheckForWin() == true) {
                WonTheGame();
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

    for (var i = 0; i < BUTTON_COUNT; i++) {
        if (btn[i].hang == 1 && btn[i].lie == 1) {
            if (btn[i].Text != 0)
                return false;
        } else if (btn[i].hang == 1 && btn[i].lie == 2) {
            if (btn[i].Text != 1)
                return false;
        }
        else if (btn[i].hang == 1 && btn[i].lie == 3) {
            if (btn[i].Text != 2)
                return false;
        } else if (btn[i].hang == 1 && btn[i].lie == 4) {
            if (btn[i].Text != 3)
                return false;
        } else if (btn[i].hang == 2 && btn[i].lie == 1) {
            if (btn[i].Text != 4)
                return false;
        } else if (btn[i].hang == 2 && btn[i].lie == 2) {
            if (btn[i].Text != 5)
                return false;
        } else if (btn[i].hang == 2 && btn[i].lie == 3) {
            if (btn[i].Text != 6)
                return false;
        } else if (btn[i].hang == 2 && btn[i].lie == 4) {
            if (btn[i].Text != 7)
                return false;
        } else if (btn[i].hang == 3 && btn[i].lie == 1) {
            if (btn[i].Text != 8)
                return false;
        } else if (btn[i].hang == 3 && btn[i].lie == 2) {
            if (btn[i].Text != 9)
                return false;
        } else if (btn[i].hang == 3 && btn[i].lie == 3) {
            if (btn[i].Text != 10)
                return false;
        } else if (btn[i].hang == 3 && btn[i].lie == 4) {
            if (btn[i].Text != 11)
                return false;
        } else if (btn[i].hang == 4 && btn[i].lie == 1) {
            if (btn[i].Text != 12)
                return false;
        } else if (btn[i].hang == 4 && btn[i].lie == 2) {
            if (btn[i].Text != 13)
                return false;
        } else if (btn[i].hang == 4 && btn[i].lie == 3) {
            if (btn[i].Text != 14)
                return false;
        } else if (btn[i].hang == 4 && btn[i].lie == 4) {
            if (btn[i].Text != 15)
                return false;
        }
    }
    return true;
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


    label.runAction(
        cc.moveTo(2, cc.p(size.width / 2, size.height / 2))
    );
}

Array.prototype.remove = function (dx) {
    if (isNaN(dx) || dx > this.length) {
        return false;
    }
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != this[dx]) {
            this[n++] = this[i]
        }
    }
    this.length -= 1

}

Array.prototype.clone = function () {
    var a = [];
    for (var i = 0, l = this.length; i < l; i++) a.push(this[i]);
    return a;
}

Array.prototype.exists = function (dx) {
    if (isNaN(dx)) {
        return false;
    }
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] == dx) {
            return true;
        }
    }
    return false;
}

