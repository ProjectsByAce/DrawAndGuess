//加载dataType.js
var fs=require("fs");
//fs.readFileSync('js/dataType.js');
//console.log(fs.readFileSync('js/dataType.js')+'');整个文本
eval(fs.readFileSync("js/dataType.js")+"");//可以读出相应的数据

//console.log(DrawMessage.startX);
var ws = require("websocket-server");
var server = ws.createServer();
server.addListener("connection", function(connection){
//    var toast="Welcome,当前在线人数有"+server.manager.length+"个";
//    server.broadcast(toast);//广播
    connection.addListener("message", function(msg){
//        server.send(msg);
        console.log(msg);
        server.broadcast(msg);
//        server.broadcast(connection.id+"说："+msg);
    });
});

server.listen(6999);
console.log("My WebSocket Server is running");