
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    dainzan:function(){
        this.node.active=false;
    },
    quxiao:function(){
        this.node.active=true;
    },

    start () {

    },

    // update (dt) {},
});
