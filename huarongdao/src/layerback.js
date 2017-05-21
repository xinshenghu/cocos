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
        //menu.addChild(back1);
        menu.setPosition(0, 0);
        this.addChild(menu);
        //this.loadTextFiled();

        //var node = new ccui.TextField("请输入账号：", "Arial", 30);
        //this.addChild(node);
        //node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2 );
        //node.addEventListener(this.onTextFieldEvent, this); // 添加事件监听器

        //node.setPasswordEnabled(true);  // 启用[密码模式]
        //node.setPasswordStyleText("*"); // 设置[密码样式]

//***********************************************
    }, // 加载[编辑框]
    //loadTextFiled: function () {
    //    var size = cc.winSize;
    //    var node = new ccui.TextField("请输入空格数量：", "Arial", 30);
    //    node.enable=true;
    //    node.keyboard;
    //    this.addChild(node);
    //    node.setPosition(size.width - 100, 150);
    //    node.addEventListener(this.onTextFieldEvent, this); // 添加事件监听器
    //
    //    //node.setPasswordEnabled(true);  // 启用[密码模式]
    //    //node.setPasswordStyleText("*"); // 设置[密码样式]
    //},
    // 事件[编辑框输入事件]
    //onTextFieldEvent: function (textField, type) {
    //    //switch (type) {
    //    //    case ccui.TextField.EVENT_ATTACH_WITH_IME:
    //    //        cc.log("[挂载到]输入法编辑器");
    //    //        break;
    //    //    case ccui.TextField.EVENT_DETACH_WITH_IME:
    //    //        cc.log("输入法编辑器[失去挂载]");
    //    //        break;
    //    //    case ccui.TextField.EVENT_INSERT_TEXT:
    //    //        cc.log("输入法编辑器[输入]");
    //    //        break;
    //    //    case ccui.TextField.EVENT_DELETE_BACKWARD:
    //    //        cc.log("输入法编辑器[删除]");
    //    //        break;
    //    //    default:
    //    //        break;
    //    //}
    //    //cc.log("编辑框中内容：", textField.getString());
    //    if (textField.getString()) {
    //        number = textField.getString();
    //
    //    }
    //},
    clickCallback: function () {
        //if (number) {
        //    shuliang = number;
        //
        //}
        cc.director.runScene(new HelloWorldScene());
    }

});

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
