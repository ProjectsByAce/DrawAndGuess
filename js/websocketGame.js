/**
 * Created by ACE on 2015/12/2.
 */
var color="blue";
var webSocketGame={
    canvas:null,//canvas object
    ctx:null,//canvasRendering2D object
    canDraw:false,//can draw or not
    startX:0,
    startY:0,
    ws:null,//webSocket对象
    drawToken:false//令牌标识
//    color:"blue"
};
$(function(){
    webSocketGame.canvas=$("#drawing-pad")[0];
    webSocketGame.ctx=webSocketGame.canvas.getContext("2d");
//            alert(webSocketGame.ctx);
    if(window.WebSocket){
        webSocketGame.ws=new WebSocket("ws://127.0.0.1:6999");
        webSocketGame.ws.onopen=function(){
            alert("OK!");
        };
        webSocketGame.ws.onclose=function(){
            alert("NO!");
        };
        webSocketGame.ws.onerror=function(){
            alert("ERROR!");
        };
        webSocketGame.ws.onmessage=function(msg){
            var data=JSON.parse(msg.data);
            console.log(data);
            switch(data.type){
                case dataType.chatMessage:
                    $("<li>").html(data.content).appendTo($("#chatList"));
                    break;
                case dataType.drawMessage:
                    drawLine(data.startX,data.startY,data.endX,data.endY);
                    break;
                case dataType.tokenMessage:
//                    alert(data.hasToken);
                    if(data.hasToken){
                        readyToDraw();
                    }
                    break;
            }
        };
        $("#send").click(function(){
            var mes=$("#message").val();
            ChatMessage.content=mes;
            webSocketGame.ws.send(JSON.stringify(ChatMessage));
            $("#message").val("");

        });
        $("#green").click(function(){
//            webSocketGame.color="green";
            color="green";
        });
        $("#red").click(function(){
//            webSocketGame.color="red";
            color="red";
        });
        $("#yellow").click(function(){
//           webSocketGame.color="yellow";
            color="yellow";
        });
    }
});

//$("#send").click(function(){
//    var mes=$("#message").val();
//    webSocketGame.ws.send(mes);
//    $("message").val();
//});

function drawLine(x1,y1,x2,y2){
//    webSocketGame.ctx.strokeStyle=webSocketGame.color;
    webSocketGame.ctx.strokeStyle=color;
    webSocketGame.ctx.lineWidth=2;
    webSocketGame.ctx.beginPath();
    webSocketGame.ctx.moveTo(x1,y1);
    webSocketGame.ctx.lineTo(x2,y2);
    webSocketGame.ctx.closePath();
    webSocketGame.ctx.stroke();
}

function readyToDraw(){
    $(webSocketGame.canvas)
        .mousedown(function(a){
            console.log("mouse down");
            webSocketGame.canDraw=true;
            //得到canvas相对浏览器的坐标
            var canvasPosition=$(this).offset();
            var canvasX=canvasPosition.left;
            var canvasY=canvasPosition.top;
            //得到鼠标相对浏览器的坐标
            var mouseX= a.pageX;
            var mouseY= a.pageY;
            //起点坐标
            webSocketGame.startX=mouseX-canvasX-8;
            webSocketGame.startY=mouseY-canvasY-7;
        })
        .mousemove(function(a){
            if(webSocketGame.canDraw==true){
                //得到canvas相对浏览器的坐标
                var canvasPosition=$(this).offset();
                var canvasX=canvasPosition.left;
                var canvasY=canvasPosition.top;
                //得到鼠标相对浏览器的坐标
                var mouseX= a.pageX;
                var mouseY= a.pageY;
                //滑动的当前点坐标
                var currentX=mouseX-canvasX-8;
                var currentY=mouseY-canvasY-7;
                //draw line
                drawLine(webSocketGame.startX,webSocketGame.startY,currentX,currentY);
                //封装并发送
                DrawMessage.startX=webSocketGame.startX;
                DrawMessage.startY=webSocketGame.startY;
                DrawMessage.endX=currentX;
                DrawMessage.endY=currentY;
                webSocketGame.ws.send(JSON.stringify(DrawMessage));
                //new point
                webSocketGame.startX=currentX;
                webSocketGame.startY=currentY;
//                            console.log("drawing...");
            }
        })
        .mouseup(function(){
            console.log("mouse up");
            webSocketGame.canDraw=false;
        });
}