//***********************************************
var number = null;
var backLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        var size = cc.winSize;
        var back = cc.MenuItemFont.create("重新生成", this.clickCallback, this);
        back.setPosition(size.width - 100, 100);
        back.setColor(cc.color.RED);
        back.setScale(1);

        var menu = new cc.Menu(back);
        menu.setPosition(0, 0);
        this.addChild(menu);

    },
    clickCallback: function () {
        cc.director.runScene(new HelloWorldScene());
    }

});


