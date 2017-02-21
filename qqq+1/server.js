/**
 * Created by Administrator on 2017/2/20.
 */
var WebScoketSever =require('ws').Server;
var wss =new WebScoketSever({port:8787});
function fasong(state,obj){
    wss.clients.forEach(function each(client){
        if(state==1){
            client.send(obj.name+":"+obj.msg)
        }
        if(state==0){
           client.send(obj.name+'退出了聊调试')
        }
    })
}
var clientLength=1;

wss.on('connection',function(ws){
    ws.send(clientLength+"人");
    clientLength+=1;
    console.log('恭喜链接成功');
    //前台的点击send方法触发的
    ws.on("message",function(result){
            var abc =eval("("+result+")");
           if(abc.name!=""){
              this.user=abc;
              fasong(1,abc);
           }
    })
    //前台的点击exit方法触发的
    ws.on('close',function(){
       clientLength-=1;
       try{
           console.log(this.user.name);
           fasong(0,this.user);
       }
       catch(e){
           console.log('刷新页面了');
       }
    })

})
