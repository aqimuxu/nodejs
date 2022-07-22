const koa = require('koa');
const fs = require('fs');
const mount = require('koa-mount');
const static = require('koa-static');

const app = new koa();

app.use(
    static(__dirname + '/source') //为什么不可以写/source/static
);
app.use(
    mount('/', async (ctx)=>{
        ctx.body=fs.readFileSync(__dirname + '/source/index.htm', 'utf-8')
    })
)

app.listen(3001);