//创建图层
var successLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        var size = cc.winSize;

        var label = new cc.Sprite(res.finish);

        this.addChild(label);
        label.attr({
            x: size.width / 2,
            y: 0,

        });


        label.runAction(
            cc.moveTo(2, cc.p(size.width / 2, size.height / 2))
        );


        //重新开始
        var back = new backLayer();
        this.addChild(back);


        return true;
    }


});

//创建场景
var scenesuccess = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new successLayer();
        this.addChild(layer);
    }
});