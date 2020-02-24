
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(flaag==2)
        {
            var action=cc.moveTo(0.25,0,-600)
            var action1=cc.fadeOut(0.5)
            var dengru=cc.find("Canvas/dengruchenggong")
            dengru.runAction(action)
            setTimeout(function()
            {
                dengru.runAction(action1)

                flaag=1
            },2000)
        }
        else  cc.log("ok")
    },

    start () {

    },

    // update (dt) {},
});
