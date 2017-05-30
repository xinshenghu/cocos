/**
 * Created by Administrator on 2017/5/30.
 */
var spritetimer = cc.Sprite.extend({
    fen: 0,
    time: 0,
    helloLabel: null,
    ctor: function () {
        this._super();
        //this.schedule();
        this.helloLabel = new cc.LabelTTF("计时: " + this.fen + "分" + this.time + "秒", "Arial", 30);
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
        this.helloLabel.setString("计时: " + this.fen + "分" + this.time + "秒");
    },
    undo: function () {
        this.unscheduleAllCallbacks();
        //this.schedule(this.onUnscheduleAll, 4);
        //this.unschedule(this.do);
    }
});

var spritefenshu = cc.Sprite.extend({
    fen: 0,
    helloLabel: null,
    ctor: function () {
        this._super();

        this.helloLabel = new cc.LabelTTF("得分: " + this.fen, "Arial", 30);
        this.helloLabel.setColor(cc.color.WHITE);
        this.addChild(this.helloLabel);


    },
    settext: function () {

        this.helloLabel.setString("得分: " + this.fen);


    }
});