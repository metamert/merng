const {Postresolver} = require("./Post.resolvers")
const {Userresolver}= require("./User.resolvers")
const {commentresolver}= require("./commentlike.resolvers")
module.exports={
    Post:{
commentsnumber(parent){
    return parent.comments.length
},
likesnumber(parent){
    return parent.likes.length
}
        
    },
Query:{
...Postresolver.Query
},
Mutation:{
...Userresolver.Mutation,
...Postresolver.Mutation,
...commentresolver.Mutation,
}

}