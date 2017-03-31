//***********************************************
var backLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        var size = cc.winSize;
        var back = cc.MenuItemFont.create("back", this.clickCallback, this);
        back.setPosition(size.width - 100, 20);
        back.setColor(cc.color.RED);

        var menu = new cc.Menu(back);
        menu.setPosition(0, 0);
        this.addChild(menu);
//***********************************************
    },
    clickCallback: function () {

        cc.director.runScene(new pintuScene());
    }

});