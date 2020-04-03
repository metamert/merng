const express=require("express")
const Post =require("./modals/postmodal")
const mongoose =require("mongoose")
const { ApolloServer, gql } = require('apollo-server');

const typeDefs=require("./graphql/typeDef")
const resolvers =require("./graphql/resolvers/Root.resolvers")






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




server.listen({ port: process.env.PORT || 5000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });


})

.catch(err=>console.log(err))

