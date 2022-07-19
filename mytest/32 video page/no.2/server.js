const app = new (require('koa'));
const {graphqlHTTP} = require('koa-graphql');   //需要加大括号

app.use(
    graphqlHTTP({
        schema:require('./schema')
    })
)

app.listen(3000)