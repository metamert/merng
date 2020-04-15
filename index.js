const express=require("express")
const Post =require("./modals/postmodal")
const mongoose =require("mongoose")
const { ApolloServer, gql } = require('apollo-server');

const typeDefs=require("./graphql/typeDef")
const resolvers =require("./graphql/resolvers/Root.resolvers")






require("dotenv").config()
const password=process.env.PASS
const MONGO=`mongodb+srv://skrite15:${password}@cluster0-bwup9.mongodb.net/test?retryWrites=true&w=majority`
const PORT=process.env.PORT








const server=new ApolloServer({
typeDefs,
resolvers,
context:({req})=>({req}),
playground:true

})

mongoose.connect(MONGO, {useNewUrlParser:true})
.then((res)=>{

console.log("mongodb bağlandı")

console.log(password)

console.log(process.env.SECRET_KEY)

console.log(process.env.PORT)



server.listen({ port: PORT }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);

  

  });


})

.catch(err=>console.log(err))

