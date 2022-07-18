const EasySock = require('easy_sock');

const protobuf = require('protocal-buffers')
const fs=require('fs');
const schemas = protobuf(fs.readFileSync(`${__dirname}/detail.proto`))

const easySock = new EasySock({
    ip:'127.0.0.1',
    port:4000,
    timeout:500,
    keepAlive:true
})

easySock.encode = function (data,seq){
    const body = schemas.ColumnRequest.encode(data);

    const head = Buffer.alloc(8);
    head.writeInt32BE(seq);
    head.writeInt32BE(body.length,4);

    return Buffer.concat([head,body])
}
easySock.decode = function (buffer){
    const seq = buffer.readint32BE();
    const body = schemas.ColumnResponse.decode(buffer.slice(8));

    return {
        result: body,
        seq
    }
}
easySock.isReceiveComplete = function (buffer) {
    if(buffer.length<8){
        return 0
    }
    const bodylength = buffer.readint32BE(4);

    if(buffer.length >= bodylength + 8) {
        return bodylength + 8
    } else {
        return  0
    }
}

module.exports = easySock;