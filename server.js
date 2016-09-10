/**
 * Created by ACE on 2015/12/2.
 */
var fs=require("fs");
eval(fs.readFileSync("js/dataType.js")+"");//同步读取文件
var ws = require("websocket-server");
var server = ws.createServer();
var connIDs=[];
server.addListener("connection", function(connection){
    connIDs.push(connection.id);
    if(connIDs.length==1){
        TokenMessage.hasToken=true;
        server.send(connIDs[0],JSON.stringify(TokenMessage));
    }
    connection.addListener("message", function(msg){
        // server.send(msg);
        console.log(msg);
        server.broadcast(connection.id+"说:"+msg);
        connection.broadcast(msg);
    });
    connection.addListener("close", function(){
        console.log("connection closed");
        connIDs=[];
    });
});

server.listen(6999);
console.log("OK!");
