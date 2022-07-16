const net = require('net');


// 创建socket
const socket = new net.Socket({});

// 连接服务器
socket.connect({
    host: '127.0.0.1',
    port: 4000
});

const lessonids = [
    "136797",
    "136798",
    "136799",
    "136800",
    "136801",
    "136803",
    "136804",
    "136806",
    "136807",
    "136808",
    "136809",
    "141994",
    "143517",
    "143557",
    "143564",
    "143644",
    "146470",
    "146569",
    "146582"
]


let id = Math.floor(Math.random()*lessonids.length);

socket.on('data',(buffer)=>{
    seqButter = buffer.slice(0,2)
    titleButter = buffer.slice(2)
    console.log(seqButter.readInt16BE(), titleButter.toString());
})

let seq = 0;
function encode(index){
    buffer = Buffer.alloc(6);
    buffer.writeInt16BE(seq);
    buffer.writeInt32BE(
        lessonids[index],2
    )
    console.log(seq, lessonids[index])
    seq++;
    return buffer
}

setInterval(()=>{
    id = Math.floor(Math.random()*lessonids.length);
    socket.write(encode(id));
},50)