//消息枚举
var dataType={
    chatMessage:0,//聊天
    drawMessage:1,//画图
    tokenMessage:2//token-令牌
};

//聊天消息
var ChatMessage={
    type:dataType.chatMessage,
    content:null
};
//画图消息
var DrawMessage={
    type:dataType.drawMessage,
    startX:0,
    startY:0,
    endX:0,
    endY:0
};
//令牌
var TokenMessage={
    type:dataType.tokenMessage,
    hasToken:false
};