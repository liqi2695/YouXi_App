window.laughflag = true
cc.Class({
    extends: cc.Component,

    properties: {

    },
    onLoad(){
        if(laughflag==true)
        {
            this.show()
        }
    },
    show(){

        let laughpage = cc.find("Canvas/laugh")//整体页面
        let youixlabel = laughpage.getChildByName("logo").getChildByName("YOUXI")//有戏logo文字
        let msglabel = cc.find("Canvas/laugh/msg")//让生活更有戏
        laughpage.active = true
        msglabel.opacity = 0
        youixlabel.opacity=0
        laughpage.opacity=0
        var fadein = cc.fadeIn(0.15)//页面淡入
        var finished = cc.callFunc(function() {//淡入回调，弹出有戏logo文字
            //定位
            var moveby = cc.moveBy(0,0,300)
            //淡入、下坠
            var fadein = cc.fadeIn(0.1)
            var movedown = cc.moveBy(0.2,0,-300)
            var action1 = cc.spawn(fadein,movedown)
            //上下弹跳
            var moveup_1 = cc.moveBy(0.15,0,120)
            var movedown_1 = cc.moveBy(0.15,0,-120)
            var moveup_2 = cc.moveBy(0.1,0,50)
            var movedown_2 = cc.moveBy(0.1,0,-50)

            var finished_2 = cc.callFunc(function() {//弹出 让生活更有戏
                var fadein_t = cc.fadeIn(1)
                var finished_t = cc.callFunc(function() {//淡出整个界面
                    var all_action4 = cc.sequence(cc.moveBy(0.5,0,0),cc.fadeOut(0.8),finished_all)
                    var finished_all = cc.callFunc(function() {//淡出整个界面

                        cc.find("Canvas/laugh").active = false

                    }, this);
                    cc.find("Canvas/laugh").runAction(all_action4)
                }, this);
                var all_action_3 = cc.sequence(fadein_t,finished_t)
                msglabel.runAction(all_action_3)
            }, this);

            var all_action = cc.sequence(moveby,action1,moveup_1,movedown_1,moveup_2,movedown_2,finished_2)
            youixlabel.runAction(all_action)
        }, this);

        var all_action = cc.sequence(fadein,finished)
        laughpage.runAction(all_action)
    }
});
