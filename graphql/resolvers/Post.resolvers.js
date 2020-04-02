const Post = require("../../modals/postmodal")
const check = require("../../utils/chechauth")
const {AuthenticationError}=require("apollo-server-express")
//const {er}= require("apollo-server-express")
module.exports.Postresolver = {

    Query: {
        async getpost(Parent,args){

try {
    const post=await Post.findById(args.postId)
if(post){
    return post
}else{
    throw new Error("REFLESH YOUR PAGE")
}

} catch (error) {
    throw new Error("REFLESH YOUR PAGE");
}


        },
        
        
        async getposts() {
            console.log("serverdan getiriliyor")
            try {
                const post = await Post.find().sort({createdAt:-1})
                return post
            } catch (error) {
                console.log(error)
            }
        }
    },
    Mutation:{
async deletepost(parent,args,context){
const user=check(context)

try {
    const post=await Post.findById(args.postid)
    if(post.username===user.username){
        await post.delete()
        return post
    }
    else{
        throw new AuthenticationError("you cant delete this post")
    }
} catch (error) {
  
throw new Error(error)
    
}


},
async createpost(parent,args,context){
    console.log(args)
    console.log("create postta")
        const user =check(context)
if(args.postbody.trim()===""){

    throw new error("post cant be empty")
}   


const newpost = new Post({

id:user.id,
body:args.postbody,
createdAt:new Date().toISOString(),
username:user.username

})


    const post= await newpost.save()

return post;

}



    }


}