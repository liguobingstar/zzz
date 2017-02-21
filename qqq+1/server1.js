/**
 * Created by Administrator on 2017/2/20.
 */
var WebScoketSever =require('ws').Server;
var wss =new WebScoketSever({port:8787});
var clientLength=1;
function fasong(state,obj){
    wss.clients.forEach(function each(client){
        if(state==1){
            client.send(obj.name+":"+obj.msg);
        }
        if(state==0){
            client.send(obj.name+退出了群聊);
        }
    })
}


wss.on('connection',function(ws){
    ws.send(clientLength+"人");
    clientLength+=1;
    ws.on("message",function(result){
        var abc =eval("("+result+")");
        if(abc.name!=""){
            this.user=abc;
            fasong(1,abc);
        }
    })
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
});