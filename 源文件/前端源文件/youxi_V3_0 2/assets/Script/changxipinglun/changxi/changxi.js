//window.p=1;
cc.Class({
    extends: cc.Component,

    properties: {
        la:{
            default:null,
            type:cc.Node,
        }
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
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
                 cc.log(dongtai);
                 
                 let result=dongtai.result;
                 cc.log(result)
                 var m=dongtai.result_number;

                 if(m==0){
                     var wrong=cc.find("Canvas/wrong");
                     wrong.active=true
                     cc.log("2323")
                 }
                 else 
                 {
                     for(let i=0;i<result.length;i++)
                  {
                     two(i);
                     
                  }
                 }
             }
         };
         xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");  
         xhr.send(data)


         /*
    var m=changxi("17816121043")
   
    var dongtai = JSON.parse(m);
    cc.log(dongtai);
    let result=dongtai.result;
    var m=dongtai.result_number;
    if(m==0){
        var wrong=cc.find("Canvas/wrong");
        wrong.active=true
        cc.log("2323")
    }

    else 
    {
        for(let i=0;i<result.length;i++)
     {
        two(i);
     }
    }
*/
  


   var animation=cc.find("Canvas/donghua1")
    animation.getComponent(cc.Animation).play("2")
    setTimeout(function() { 
        var mp=cc.find("Canvas/ppp")
        mp.destroy();
        animation.destroy()
    }, 2000); 


    
    },
    //lateUpdate(){
   //     var mp=cc.find("Canvas/listen")
   // mp.destroyAllChildren();
    
  //  },
  
    

    // update (dt) {},
});
