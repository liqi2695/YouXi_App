cc.Class({
    extends: cc.Component,

    properties: {
      
    },
    onLoad(){
        this.show()

    },

    //出场动画
    show:function(){
        cc.log("show")
        var move_down = cc.moveBy(0,0,-500)
        var fade_out = cc.fadeOut(0)
        var move_action1 = cc.spawn(move_down,fade_out)

        var move_up = cc.moveBy(0.3,0,500)
        var fade_in = cc.fadeIn(0.23)
        var move_action2 = cc.spawn(move_up,fade_in)
        var sum_action = cc.sequence(move_action1,move_action2)
        this.node.getChildByName("确认框").runAction(sum_action)
    },

    //消失动画
    close:function(){
        cc.log("close")

        var move_down = cc.moveBy(0.2,0,-500)
        var fade_out = cc.fadeOut(0.18)
        var sum_action = cc.spawn(move_down,fade_out)

        var finished = cc.callFunc(function(target) {
            this.node.destroy()
        }, this);
        var sum = cc.sequence(sum_action,finished)
        this.node.runAction(sum)
    },

    //返回按钮点击事件
    cilck_back:function(){
        cc.log("cilck_back")
        this.close()
        cc.find("Canvas").getComponent("SendPage").enable_button()
    },

    //删除按钮的点击事件
    cilck_delete:function(){
        cc.log("cilck_delete")
        this.close()
        cc.director.loadScene("cp_SingScene");
    },

    start () {

    },

});
