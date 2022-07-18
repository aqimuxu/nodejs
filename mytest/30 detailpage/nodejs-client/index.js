const mount = require('koa-mount');
const static = require('koa-static')
const app = new (require('koa'));

app.use(mount('/static', static(`${__dirname}/source/static`)))

app.use(async (ctx) => {

})

//app.listen(3000)
const rpcClient = require('./client');
rpcClient.write({
    columnid:24
},function (err,data){
    console.log(err,data)
})