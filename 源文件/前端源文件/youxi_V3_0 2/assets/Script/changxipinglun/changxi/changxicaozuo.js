window.changxi={
    AudioUrl:" ",
    PersonalNickName:"2",
    PictureNumber:"2",
    Time:"90",
    Position:"加拿大",
    RandomPictureUrl:"",
    VideosTitle:"打猪草",
    number:" ",
    CommentNumber:" ",
    PersonalPhone:" ",
    PriseNumber:" ",
}
function two(i){
    var url = "http://47.103.115.138/youxi/behind/audio2.php"
     var param_str=
     {
         "PersonalPhone":"17816121043",
     }
     data = older(param_str)   
     var xhr = new XMLHttpRequest();
     xhr.open('POST', url, true);//新建一个http连接,false为同步，true为一步
     xhr.onreadystatechange = function () {//声明回调函数
         if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
             var response = xhr.responseText;//接受返回json
             var dongtai = JSON.parse(response);
                let result=dongtai.result;
                cc.loader.loadRes("mp",cc.Prefab,function(err,pre)   //加载resources文件夹里面的mp预制体
                {
                    
                    PriseNumber=result[i].PriseNumber
                    AudioUrl=result[i].AudioUrl
                    PersonalNickName=result[i].PersonalNickName;
                    PictureNumber=result[i].PictureNumber;
                    Time=result[i].Time;
                    Position=result[i].Position;
                    RandomPictureUrl=result[i].RandomPictureUrl
                    VideosTitle=result[i].VideosTitle;
                    PersonalPhone=result[i].PersonalPhone
                    //let mp=cc.find("Canvas/scrollview/view/content");   
                    var trends=cc.instantiate(pre)   //克隆名字为pre的预制体并将其实例化成新节点
                    
                    trends.name="trends"
                    var pau=trends.getChildByName("puase")
                    pau.active=false;  //暂停按钮不显示
                     trends.getChildByName("yidianzan").active=false;        //点赞按钮不显示
                     trends.getChildByName("back1").active=false
                
                    trends.anchorX=0.5
                    trends.anchorY=0.5              //对锚点进行设置
            
                    trends.getComponent("yuzhiti").AudioUrl=AudioUrl
                    trends.getComponent("yuzhiti").PersonalNickName=PersonalNickName
                    trends.getComponent("yuzhiti").PictureNumber=PictureNumber
                    trends.getComponent("yuzhiti").Time=Time
                    trends.getComponent("yuzhiti").Position=Position
                    trends.getComponent("yuzhiti").RandomPictureUrl=RandomPictureUrl
                    trends.getComponent("yuzhiti").VideosTitle=VideosTitle
                    trends.getComponent("yuzhiti").PersonalPhone=PersonalPhone
                    trends.getComponent("yuzhiti").PriseNumber=PriseNumber
            
                    //同步头像
                    var toux=trends.getChildByName("touxiang");
                    cc.loader.loadRes(PictureNumber, cc.SpriteFrame, function (err, sf) {
                    toux.getComponent(cc.Sprite).spriteFrame = sf;
                    })                                                    //头像动态变化
            
            
                    //给头像添加点击事件    
                    var self=cc.find("Canvas")
                    var clickEventHandler = new cc.Component.EventHandler();
                    clickEventHandler.target = self;    // 这个 node 节点是你的事件处理代码组件所属的节点
                    clickEventHandler.component = "change";  // 这个是代码文件名
                    clickEventHandler.handler = "tozhuye";
                    clickEventHandler.customEventData = "foobar";
                    var btn=toux.getComponent(cc.Button);
                    btn.clickEvents.push(clickEventHandler);
            
                    //播放量
                    var random_t = parseInt(Math.random()*100)
                    trends.getChildByName("bofangliang").getComponent(cc.Label).string=random_t


           

                     trends.getChildByName("dianzanshu").getComponent(cc.Label).string=PriseNumber
                    //同步评论数
                    var url = "http://47.103.115.138/youxi/behind/comment3.php"
                     var param_str=
                     {
                         "AudioUrl":AudioUrl,
                     }
                     data = older(param_str)
                     var xhr = new XMLHttpRequest();
                     xhr.open('POST', url, true);//新建一个http连接
                     xhr.onreadystatechange = function () {//声明回调函数
                         if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                             var response = xhr.responseText;//接受返回json
                             var comment=JSON.parse(response)

                             var result2=comment.result_number
                             CommentNumber=result2
                             trends.getChildByName("pinglunshu").getComponent(cc.Label).string=CommentNumber
                             trends.getComponent("yuzhiti").CommentNumber=CommentNumber
         
                         }
                     };
                     xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");  
                     xhr.send(data)

                    //同步昵称
                    var NickName=trends.getChildByName("nicheng");
                    NickName.getComponent(cc.Label).string=PersonalNickName;
            
                    //同步时间
                    var time=trends.getChildByName("time");
                    time.getComponent(cc.Label).string=Time
            
                    //同步位置
                    var posi=trends.getChildByName("position")
                    posi.getComponent(cc.Label).string=Position
            
                    //同步剧名
                    var title=trends.getChildByName("title");
                    title.getComponent(cc.Label).string=VideosTitle;
            
                    //加载aac文件
                    var v=trends.getChildByName("videoplayer")
                    v.getComponent(cc.VideoPlayer).remoteURL=AudioUrl;
            
                    //加载图片音频随机分配的图片
                    cc.loader.load(RandomPictureUrl,function(err,tt){
                        
                        code = new cc.SpriteFrame(tt);          
                        let qw=trends.getChildByName("picture")
                        qw.getComponent(cc.Sprite).spriteFrame=code
                    //    mp.addChild(trends);   
                    let mp=cc.find("Canvas/scrollview/view/content"); 
                   
                     mp.addChild(trends); 
                
                    })
                    
                       
                })   
         }
     };
     xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");  
     xhr.send(data)
}

/*
function two(i){
    
    var m=changxi("17816121043")
    var dongtai = JSON.parse(m);
    
    let result=dongtai.result;

    //   cc.log(AudioUrl,PersonalNickName,PictureNumber,Time,Position,VideosTitle)
    cc.loader.loadRes("mp",cc.Prefab,function(err,pre)   //加载resources文件夹里面的mp预制体
    {
        AudioUrl=result[i].AudioUrl;
        PersonalNickName=result[i].PersonalNickName;
        PictureNumber=result[i].PictureNumber;
        Time=result[i].Time;
        Position=result[i].Position;
        RandomPictureUrl=result[i].RandomPictureUrl
        VideosTitle=result[i].VideosTitle;
        PersonalPhone=result[i].PersonalPhone
        let mp=cc.find("Canvas/scrollview/view/content");   
        var trends=cc.instantiate(pre)   //克隆名字为pre的预制体并将其实例化成新节点
        
        trends.name="trends"
        var pau=trends.getChildByName("puase")
        pau.active=false;  //暂停按钮不显示
         trends.getChildByName("yidianzan").active=false;        //点赞按钮不显示
         trends.getChildByName("back1").active=false
    
         trends.anchorX=0.5
        trends.anchorY=0.5              //对锚点进行设置

        

        trends.getComponent("yuzhiti").AudioUrl=AudioUrl
        trends.getComponent("yuzhiti").PersonalNickName=PersonalNickName
        trends.getComponent("yuzhiti").PictureNumber=PictureNumber
        trends.getComponent("yuzhiti").Time=Time
        trends.getComponent("yuzhiti").Position=Position
        trends.getComponent("yuzhiti").RandomPictureUrl=RandomPictureUrl
        trends.getComponent("yuzhiti").VideosTitle=VideosTitle
        trends.getComponent("yuzhiti").PersonalPhone=PersonalPhone

        //同步头像
        var toux=trends.getChildByName("touxiang");
        cc.loader.loadRes(PictureNumber, cc.SpriteFrame, function (err, sf) {
        toux.getComponent(cc.Sprite).spriteFrame = sf;
        })                                                    //头像动态变化


        //给头像添加点击事件    
        var self=cc.find("Canvas")
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = self;    // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "change";  // 这个是代码文件名
        clickEventHandler.handler = "tozhuye";
        clickEventHandler.customEventData = "foobar";
        var btn=toux.getComponent(cc.Button);
        btn.clickEvents.push(clickEventHandler);

        //播放量
        var random_t = parseInt(Math.random()*100)
        trends.getChildByName("bofangliang").getComponent(cc.Label).string=random_t
        //同步点赞数
       var m=dianzan(AudioUrl)
        var like = JSON.parse(m);
        
        var result1=like.result
        number=result1[0].PriseNumber
        trends.getChildByName("dianzanshu").getComponent(cc.Label).string=number
        trends.getComponent("yuzhiti").number=number

        //同步评论数
        var n=pinlunnumber(AudioUrl)
        var comment=JSON.parse(n)
        
        var result2=comment.result_number
        CommentNumber=result2
        trends.getChildByName("pinglunshu").getComponent(cc.Label).string=CommentNumber

        trends.getComponent("yuzhiti").CommentNumber=CommentNumber
        //同步昵称
        var NickName=trends.getChildByName("nicheng");
        NickName.getComponent(cc.Label).string=PersonalNickName;

        //同步时间
        
        var time=trends.getChildByName("time");
        time.getComponent(cc.Label).string=Time

        //同步位置
        var posi=trends.getChildByName("position")
        posi.getComponent(cc.Label).string=Position

        //同步剧名
        var title=trends.getChildByName("title");
        title.getComponent(cc.Label).string=VideosTitle;

        

        //加载aac文件
        var v=trends.getChildByName("videoplayer")
        v.getComponent(cc.VideoPlayer).remoteURL=AudioUrl;


        //加载图片音频随机分配的图片
        cc.loader.load(RandomPictureUrl,function(err,tt){
            
            code = new cc.SpriteFrame(tt);          
            let qw=trends.getChildByName("picture")
            qw.getComponent(cc.Sprite).spriteFrame=code
            mp.addChild(trends);   
    
        })
    })   
}
*/
