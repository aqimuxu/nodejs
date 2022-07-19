var {graphql, buildSchema}=require('graphql');

var schema = buildSchema(`
    type Query{
        hello:String
    }
`);

var root = {
    hello:()=>{
        return 'Hello world';
    },
}

module.exports=function (query){
    return graphql(schema, query, root).then(response=>{
        return response
    })
}
