BUTTON_COUNT = 25;
SQUARE_ROOT = Math.sqrt(BUTTON_COUNT);
PART_COUNT = 2 * Math.sqrt(BUTTON_COUNT) + 1;
var btn = [];

count = 0;
step = "";

var HelloWorldLayer = cc.Layer.extend({
    sprite: null,
    quyu: [],
    ctor: function () {

        this._super();

        var size = cc.winSize;

        //var a = colorSprite(size, new cc.Color(255, 0, 0, 255));
        //this.addChild(a);


        for (var i = 0; i < BUTTON_COUNT; i++) {
            //btn[i] = colorSprite(new cc.Size(50, 50), new cc.Color(255, 0, 0, 255));
            btn[i] = new spriteMy();
            btn[i].addtext(i + 1);
            btn[i].Text = i + 1;
            //btn[i].width = size.width / PART_COUNT;
            //btn[i].height = size.height / PART_COUNT;
            btn[i].Left = size.width / PART_COUNT + 2 * (i % SQUARE_ROOT) * size.width / PART_COUNT;
            btn[i].Top = size.height - (size.height / PART_COUNT + 2 * (Math.floor(i / SQUARE_ROOT)) * size.height / PART_COUNT);
            btn[i].setPosition(btn[i].Left, btn[i].Top);
            //btn[i].BackColor = Color.SeaGreen;
            //btn[i].Text = Convert.ToString(i + 1);
            //btn[i].Click += new EventHandler(btn_Click); //给按钮添加事件
            btn[i].Tag = 0;
            //this.Controls.Add(btn[i]);

            this.addChild(btn[i]);
        }


        //this.quyu = [];
        //var temp = [];
        //for (var m = 0; m < 5; m++) {
        //
        //    for (var n = 5 * m; n < 5 + 5 * m; n++) {
        //        temp.push(btn[n]);
        //
        //    }
        //    this.quyu.push(temp.clone());
        //    temp = [];
        //}


        var helloLabel = new cc.LabelTTF("请把所有按钮变红!  要快哦! 点击一个周围四个也会变色", "Arial", 12);

        helloLabel.x = 100;
        helloLabel.y = size.height - 20;

        this.addChild(helloLabel, 5);


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

var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});


var spriteMy = cc.Sprite.extend({
    Tag: 0,
    Text: 0,
    ctor: function () {
        //this._super();

        //size = new cc.Size(50, 50);
        //color = new cc.Color(0, 255, 0,255);
        ////
        ////this.setContentSize(size);
        ////this.setColor(cc.color(55,55,55));
        ////this.setColor(cc.Color.RED);
        //var render = new cc.RenderTexture(size.width, size.height);
        //render.beginWithClear(color.r, color.g, color.b, color.a);
        //render.visit();
        //render.end();
        //
        //this._super(render.getSprite().texture);

        this._super(res.zhuankuai);
        color = new cc.Color(0, 255, 0);
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

            i = target.Text - 1;
            ChangeButtonState(i); //被点击的按钮

            //这里改一下算法 如果是第一行上面的就加20 其他的剪5 上边按钮
            if (i == 0 || i == 1 || i == 2 || i == 3 || i == 4) {
                ChangeButtonState(i + 20);

            } else {
                ChangeButtonState(i - 5);

            }

            //右边按钮
            if (i == 4 || i == 9 || i == 14 || i == 19 || i == 24) {
                ChangeButtonState(i - 4);

            } else {
                ChangeButtonState(i + 1);

            }

            //左边按钮
            if (i == 0 || i == 5 || i == 10 || i == 15 || i == 20) {
                ChangeButtonState(i + 4);

            } else {
                ChangeButtonState(i - 1);

            }
            //下边按钮
            if (i == 20 || i == 21 || i == 22 || i == 23 || i == 24) {
                ChangeButtonState(i - 20);

            } else {
                ChangeButtonState(i + 5);

            }


            //ChangeButtonState((i / SQUARE_ROOT) * SQUARE_ROOT + (i + 1) % SQUARE_ROOT); //右边按钮
            //ChangeButtonState((i / SQUARE_ROOT) * SQUARE_ROOT + (i + SQUARE_ROOT - 1) % SQUARE_ROOT); //左边按钮
            //ChangeButtonState((i + SQUARE_ROOT) % BUTTON_COUNT); //下边按钮
            //ChangeButtonState((i - SQUARE_ROOT + BUTTON_COUNT) % BUTTON_COUNT); //上边按钮

            count++;
            step += (i + 1) + " ";

            if (CheckForWin() == true)
            {
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


function ChangeButtonState(i) {
    {
        if (btn[i].Tag == 0) {
            btn[i].Tag = 1;

            //size = new cc.Size(50, 50);
            color = new cc.Color(255, 0, 0);
            //var render = new cc.RenderTexture(size.width, size.height);
            //render.beginWithClear(color.r, color.g, color.b, color.a);
            //render.visit();
            //render.end();
            //btn[i].setColor( new cc.Color(255, 0, 0));
            //var action = cc.tintTo(1, 255, 100, 10);
            //btn[i].runAction(action);

            //btn[i].setColor( new cc.Color("ff", 21, 00));
            //var tintRed = cc.tintBy(0.1, 0, -255, -255);
            //var tintRedBack = tintRed.reverse();
            //var green = cc.sequence(tintRed).repeat(1);
            //btn[i].runAction(green);
            btn[i].setColor(color);

        }
        else {
            btn[i].Tag = 0;

            //size = new cc.Size(50, 50);
            color = new cc.Color(0, 255, 0);
            //var render = new cc.RenderTexture(size.width, size.height);
            //render.beginWithClear(color.r, color.g, color.b, color.a);
            //render.visit();
            //render.end();
            btn[i].setColor(color);
        }
    }
}

function CheckForWin(){

    for (var i = 0; i < BUTTON_COUNT; i++)
    {
        if (btn[i].Tag == 0)
        {
            return false;
        }
    }
    return true;
}

function WonTheGame(){
    cc.director.runScene(new scenesuccess());

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

