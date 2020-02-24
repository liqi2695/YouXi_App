cc.Class({
    extends: cc.Component,

    properties: {
      
    },
    onLoad(){
        this.open_successpage()
    },

    //下滑、淡出、销毁
    close_successpage:function(){
        cc.log("quit successpage")

        var move_down = cc.moveBy(0.2,0,-500)
        var fade_out = cc.fadeOut(0.18)
        var sum_action = cc.spawn(move_down,fade_out)

        var finished = cc.callFunc(function(target) {
            this.node.destroy()
            cc.director.loadScene("cp_FirstPageScene");
        }, this);
        var sum = cc.sequence(sum_action,finished)
        
        this.node.runAction(sum)
    },

    //上滑、淡入
    open_successpage:function(){
        cc.log("load successpage")

        var move_down = cc.moveBy(0.0001,0,-1500)
        var fade_out = cc.fadeOut(0.0001)
        var move_action1 = cc.spawn(move_down,fade_out)

        var move_up = cc.moveBy(0.3,0,1500)
        var fade_in = cc.fadeIn(0.23)
        var move_action2 = cc.spawn(move_up,fade_in)

        var sum_action = cc.sequence(move_action1,move_action2)

        this.node.runAction(sum_action)
    }

});
