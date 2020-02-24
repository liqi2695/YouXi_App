
cc.Class({
    extends: cc.Component,

    properties: {
    
     },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {      

    },

    start () {

    },

    bofang:function(){
      //  var self=this.getChildByName("videoplayer")
        var bof=this.getComponent(cc.VideoPlayer);
        bof.play();
    },
    pause:function(){
        this.getComponent(cc.VideoPlayer).pause();
    }

    // update (dt) {},
});
