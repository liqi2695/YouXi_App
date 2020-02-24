var mlert = {
    _mlert: null,           // prefab
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
mlert.show = function (detailString, enterCallBack, needCancel, animSpeed) {

    // 引用
    var self = this;

    // 判断
    if (mlert._mlert != undefined) return;

    // 
    mlert._animSpeed = animSpeed ? animSpeed : mlert._animSpeed;

    // 加载 prefab 创建
    cc.loader.loadRes("mlert", cc.Prefab, function (error, prefab) {

        if (error) {
            cc.error(error);
            return;
        }

        // 实例 
        var mlert = cc.instantiate(prefab);

        // mlert 持有
        mlert._mlert = mlert;

        // 动画 
        var cbFadeOut = cc.callFunc(self.onFadeOutFinish, self);
        var cbFadeIn = cc.callFunc(self.onFadeInFinish, self);
        self.actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(mlert._animSpeed, 255), cc.scaleTo(mlert._animSpeed, 1.0)), cbFadeIn);
        self.actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(mlert._animSpeed, 0), cc.scaleTo(mlert._animSpeed, 2.0)), cbFadeOut);

        // 获取子节点
        mlert._detailLabel = cc.find("mlertBackground/detailLabel", mlert).getComponent(cc.Label);
        mlert._cancelButton = cc.find("mlertBackground/cancelButton", mlert);
        mlert._enterButton = cc.find("mlertBackground/enterButton", mlert);

        // 添加点击事件
        mlert._enterButton.on('click', self.onButtonClicked, self);
        mlert._cancelButton.on('click', self.onButtonClicked, self);

        // 父视图
        mlert._mlert.parent = cc.find("Canvas");

        // 展现 mlert
        self.startFadeIn();

        // 参数
        self.configmlert(detailString, enterCallBack, needCancel, animSpeed);
        
    });

    // 参数
    self.configmlert = function (detailString, enterCallBack, needCancel, animSpeed) {

        // 回调
        mlert._enterCallBack = enterCallBack;

        // 内容
        mlert._detailLabel.string = detailString;
        // 是否需要取消按钮
        if (needCancel || needCancel == undefined) { // 显示
            mlert._cancelButton.active = true;
        } else {  // 隐藏
            mlert._cancelButton.active = false;
            mlert._enterButton.x = 0;
        }
    };

    // 执行弹进动画
    self.startFadeIn = function () {
        cc.eventManager.pauseTarget(mlert._mlert, true);
        mlert._mlert.position = cc.p(0, 0);
        mlert._mlert.setScale(2);
        mlert._mlert.opacity = 0;
        mlert._mlert.runAction(self.actionFadeIn);
    };

    // 执行弹出动画
    self.startFadeOut = function () {
        cc.eventManager.pauseTarget(mlert._mlert, true);
        mlert._mlert.runAction(self.actionFadeOut);
    };

    // 弹进动画完成回调
    self.onFadeInFinish = function () {
        cc.eventManager.resumeTarget(mlert._mlert, true);
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

    // 销毁 mlert (内存管理还没搞懂，暂且这样写吧~v~)
    self.onDestory = function () {
        mlert._mlert.destroy();
        mlert._enterCallBack = null;
        mlert._mlert = null;
        mlert._detailLabel = null;
        mlert._cancelButton = null;
        mlert._enterButton = null;
        mlert._animSpeed = 0.3;
    };
};