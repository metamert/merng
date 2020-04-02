const jwt = require("jsonwebtoken")
const {SECRET_KEY} = require("../config")
const {AuthenticationError}= require("apollo-server-express")


module.exports=(context)=>{

 
const responseheader=context.req.headers.authorization;   
console.log(context.req.headers)
if(responseheader){

const token=responseheader.split("Bearer ")[1]
if(token){
    try {
        const user=jwt.verify(token,SECRET_KEY)
        console.log(user)
return user;

    } catch (error) {
        throw new AuthenticationError("OTURUM GÜVENLİK İÇİN ZAMAN AŞIMINA UĞRADI TEKRAR GİRİŞ YAPINIZ")
    }
}
throw new Error("GİRİŞ YAPMANIZ GEREKMEKTEDİR, (PLEASE SİGN İN)")

}




throw new Error("GİRİŞ YAPMANIZ GEREKMEKTEDİR, (PLEASE SİGN İN)") 
}