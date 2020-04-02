const {gql} = require("apollo-server-express")


module.exports=gql`
type Post{
id:ID!
body:String!
createdAt:String!
username:String!
comments:[Comment]!
likes:[Like]!
commentsnumber:Int!
likesnumber:Int!

}
type Query{
getpost(postId:ID!):Post
getposts:[Post]

}
type User{
id:ID!
username:String!
token:String!
createdAt:String!
email:String!
}
type Like{
id:ID!
username:String!
createdAt:String!
}
type Comment{
id:ID!
username:String!
createdAt:String!
body:String!
}

input registerinput{
email:String!
password:String!
confirm:String!
username:String!
}


type Mutation{
    
deletecomment(postid:ID!,commentid:ID!):Post!
createlike(postid:ID!):Post!
createcomment(postid:ID!,body:String!):Post!
deletepost(postid:ID!):Post!    
createpost(postbody:String!):Post!
register(registerinput:registerinput):User!
Signin(email:String,password:String):User!
}



`