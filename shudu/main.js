cc.game.onStart = function () {
    //cc.view.adjustViewPort(true);
    if (!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));

    cc.view.setDesignResolutionSize(640, 1136, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);

    cc.LoaderScene.preload(g_resources, function () {

        cc.director.runScene(new pintuScene());

    }, this);

};
cc.game.run();