const check = require("../../utils/chechauth")
const Post = require("../../modals/postmodal")
module.exports.commentresolver = {

    Mutation: {

        createlike: async (parent, args, context) => {
            const user = check(context)

            const post = await Post.findById(args.postid)
            if (post) {

                const liked = post.likes.find((like) => like.username === user.username);
                if (!liked) {
                    post.likes.push({
                        username: user.username,
                        createdAt: new Date().toISOString

                    })
                    const newpost = await post.save()
                    return newpost;


                } else {

                   post.likes=post.likes.filter((likes) => likes.username !== user.username)
                    const newpost = post.save()
                    return newpost

                }

            }
            else {

                throw new Error("post not found")
            }


        },




        deletecomment: async (parent, args, context) => {
            const user = check(context)
            const post = await Post.findById(args.postid)
            if (post) {
console.log(args.commentid)
                const commentindex = post.comments.findIndex((c)=> c.id === args.commentid)

                if (post.comments[commentindex].username === user.username) {

                    post.comments.splice(commentindex, 1)
                    const newpost = await post.save()
                    return newpost
                } else {
                    throw new Error("you cant delete this post")
                }


            }
            else {

                throw new Error("post not found")

            }

        },



        createcomment: async (parent, args, context) => {
            const user = check(context)


            if (args.body.trim() === "") {

                throw new Error("comment cant be empty", { errors: { body: "body cannot empty" } })
            }

            const post = await Post.findById(args.postid)
            if (post) {
                //there is post
              
                post.comments.unshift({

                    body: args.body,
                    username: post.username,
                    createdAt: new Date().toISOString


                })
                const newpost = post.save()
                return newpost

            }
            else {
                //there is not post
                throw new Error("post not found")
            }



        }



    }





}