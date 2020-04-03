const express=require("express")
const Post =require("./modals/postmodal")
const mongoose =require("mongoose")
const {gql,ApolloServer} =require("apollo-server-express")

const typeDefs=require("./graphql/typeDef")
const resolvers =require("./graphql/resolvers/Root.resolvers")

const app=express();




require("dotenv").config()
const MONGO=process.env.MONGO











const server=new ApolloServer({
typeDefs,
resolvers,
context:({req})=>({req}),
playground:true

})

mongoose.connect(MONGO, {useNewUrlParser:true})
.then((res)=>{

console.log("mongodb bağlandı")


server.applyMiddleware({app})
app.listen(process.env.PORT || 5000,()=>console.log(`server is running on : localhost:5000${server.graphqlPath}`))

}).catch(err=>console.log(err))

