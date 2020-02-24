cc.Class({
    extends: cc.Component,
    properties: {
        View:cc.ScrollView,
        ViewNode:cc.Node,
        refleash_flag:cc.Boolean,
        shuaxin:{
            type:cc.Node,
            default:null,
        },
        donghua:{
            type:cc.Node,
            default:null,
        }
    },
    onLoad () {
        var reFleshOffSet = parseInt(this.ViewNode.getContentSize().height*0.42)
        console.log("!!!reFleshOffSet:",reFleshOffSet)
        //刷新标志符
        this.refleash_flag = false
        console.log("!!!refleash_flag:",this.refleash_flag)
    },

    start () {

    },

    //ScrollView控件的触摸回调函数
    viewTouch:function()
    {
        
        //获取当前下拉偏移量
        var offSet = this.View.getContentPosition().y
        //cc.log(offSet)
    
        //获取ScrollView控件尺寸并计算触发刷新的偏移量
        var reFleshOffSet = this.ViewNode.getContentSize().height*0.42

        //触发刷新
        if(offSet < reFleshOffSet)
        {
            this.refleash_flag=true
            this.shuaxin.active=true;
           // this.donghua.active=true;
        }
        if(this.refleash_flag && offSet > reFleshOffSet)
        {
            this.refleash()
            this.refleash_flag=false
            
        }
    },

    addItem:function(item_name,item_pic,item_toUrl)
    {
        
        
    },

    //刷新dongtai
    refleash:function()
    {
     //   this.donghua.active=false;
        this.shuaxin.active=false;

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
                 var des=cc.find("Canvas/scrollview/view/content");
                 des.destroyAllChildren()
                 for(let i=0;i<result.length;i++)
                 {
                     two(i);
                 }
                 console.log("reflesh!!!")
             }
         };
         xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");  
         xhr.send(data)
    }
    
});
