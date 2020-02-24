var admit = {
    _alert: null,           // prefab
    _detailLabel:   null,   // 内容
    _cancelButton:  null,   // 确定按钮
    _enterButton:   null,   // 取消按钮
    _enterCallBack: null,   // 回调事件
    _animSpeed:     0.3,    // 动画速度
};

/**
 * detailString :   内容 string 类型.
 * enterCallBack:   确定点击事件回调  function 类型.
 * neeCancel:       是否展示取消按钮 bool 类型 default YES.
 * duration:        动画速度 default = 0.3.
*/
admit.show = function (detailString, enterCallBack, needCancel, animSpeed) {

    // 引用
    var self = this;

    // 判断
    if (admit._alert != undefined) return;

    // 
    admit._animSpeed = animSpeed ? animSpeed : admit._animSpeed;

    // 加载 prefab 创建
    cc.loader.loadRes("admit", cc.Prefab, function (error, prefab) {

        if (error) {
            cc.error(error);
            return;
        }

        // 实例 
        var alert = cc.instantiate(prefab);

        // Alert 持有
        admit._alert = alert;

        // 动画 
        var cbFadeOut = cc.callFunc(self.onFadeOutFinish, self);
        var cbFadeIn = cc.callFunc(self.onFadeInFinish, self);
        self.actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(admit._animSpeed, 255), cc.scaleTo(admit._animSpeed, 1.0)), cbFadeIn);
        self.actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(admit._animSpeed, 0), cc.scaleTo(admit._animSpeed, 2.0)), cbFadeOut);

        // 获取子节点
        admit._detailLabel = cc.find("alertBackground/detailLabel", alert).getComponent(cc.Label);
        admit._cancelButton = cc.find("alertBackground/cancelButton", alert);
        admit._enterButton = cc.find("alertBackground/enterButton", alert);

        // 添加点击事件
        admit._enterButton.on('click', self.onButtonClicked, self);
        admit._cancelButton.on('click', self.onButtonClicked, self);

        // 父视图
        admit._alert.parent = cc.find("Canvas");

        // 展现 alert
        self.startFadeIn();

        // 参数
        self.configadmit(detailString, enterCallBack, needCancel, animSpeed);
        
    });

    // 参数
    self.configadmit = function (detailString, enterCallBack, needCancel, animSpeed) {

        // 回调
        admit._enterCallBack = enterCallBack;

        // 内容
        admit._detailLabel.string = detailString;
        // 是否需要取消按钮
        if (needCancel || needCancel == undefined) { // 显示
            admit._cancelButton.active = true;
        } else {  // 隐藏
            admit._cancelButton.active = false;
            admit._enterButton.x = 0;
        }
    };

    // 执行弹进动画
    self.startFadeIn = function () {
        cc.eventManager.pauseTarget(admit._alert, true);
        admit._alert.position = cc.p(0, 0);
        admit._alert.setScale(2);
        admit._alert.opacity = 0;
        admit._alert.runAction(self.actionFadeIn);
    };

    // 执行弹出动画
    self.startFadeOut = function () {
        cc.eventManager.pauseTarget(admit._alert, true);
        admit._alert.runAction(self.actionFadeOut);
    };

    // 弹进动画完成回调
    self.onFadeInFinish = function () {
        cc.eventManager.resumeTarget(admit._alert, true);
    };

    // 弹出动画完成回调
    self.onFadeOutFinish = function () {
        self.onDestory();
    };

    // 按钮点击事件
    self.onButtonClicked = function(event){
        if(event.target.name == "enterButton"){
            if(self._enterCallBack){
                self._enterCallBack();
            }
        }
        self.startFadeOut();
    };

    // 销毁 alert (内存管理还没搞懂，暂且这样写吧~v~)
    self.onDestory = function () {
        admit._alert.destroy();
        admit._enterCallBack = null;
        admit._alert = null;
        admit._detailLabel = null;
        admit._cancelButton = null;
        admit._enterButton = null;
        admit._animSpeed = 0.3;
    };
};