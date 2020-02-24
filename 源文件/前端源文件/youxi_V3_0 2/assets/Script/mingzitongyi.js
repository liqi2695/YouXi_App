
cc.Class({
    extends: cc.Component,

    properties: {
    
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let zh=cc.find("Canvas/zhanghao");
        zh.getComponent(cc.Label).string=p4_1;     //手机号
        let nn=cc.find("Canvas/nickname");
        nn.getComponent(cc.Label).string=p2_1;     //昵称
        var self = cc.find("Canvas/tuxiang");
        cc.loader.loadRes(x, cc.SpriteFrame, function (err, sf) {
        self.getComponent(cc.Sprite).spriteFrame = sf;   //头像
 });
        var self1 = cc.find("Canvas/quitlanding/touxiang_1");
        cc.loader.loadRes(x, cc.SpriteFrame, function (err, sf) {
        self1.getComponent(cc.Sprite).spriteFrame = sf;   //头像
        });
        cc.find("Canvas/quitlanding/zhanghao_1").getComponent(cc.Label).string=p4_1
        cc.find("Canvas/quitlanding/nicheng").getComponent(cc.Label).string=p2_1
        cc.find("Canvas/quitlanding/shoujihao").getComponent(cc.Label).string=p4_1


        //我的资料
        var code=cc.find("Canvas/modify_data/code_num/code_1")
        var self2= code.getChildByName("tou")
        cc.loader.loadRes(x, cc.SpriteFrame, function (err, sf) {
        self2.getComponent(cc.Sprite).spriteFrame = sf;   //头像
        code.getChildByName("nick").getComponent(cc.Label).string=p2_1
        code.getChildByName("phone").getComponent(cc.Label).string=p4_1

 });
    },

    start () {
        

    },
    

    // update (dt) {},
});
