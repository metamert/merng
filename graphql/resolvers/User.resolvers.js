const bcrypt=require("bcryptjs")
const jwt = require("jsonwebtoken")
const {SECRET_KEY}=require("../../config")
const User = require("../../modals/usermodal")
const {UserInputError}= require("apollo-server-express")
const {validationregister,validationsignin} =require("../../utils/validation")
const createToken=(user)=>{
  return jwt.sign(
    {
    id:user.id,
    email:user.email,
    username:user.username
    
    
    },SECRET_KEY,{expiresIn:"1h"}
    
    )
  
}


module.exports.Userresolver={



Mutation:{
async Signin(parent,{email,password}){
  
  
  
const{Signerrorsexits,Signerrors}=validationsignin(email,password)

if(!Signerrorsexits){

  throw new UserInputError("sign in error",{Signerrors})
}

const user=await User.findOne({email})
if(!user){
  Signerrors.Signerror="email or password dont match!"
throw new UserInputError("email or password incorrect!",{Signerrors})

}

const match=await bcrypt.compare(password,user.password)
if(!match){
throw new UserInputError("email or password wrong",{Signerrors})


}

const token = createToken(user)

return{
token,
id:user._id,
...user._doc


}





},


async register(parent,{
registerinput:{
email,
password,
confirm,
username
}

},content,info){

console.log(email)
console.log(password)
console.log(confirm)
  //Validation
const {errors,errorisexits} = validationregister(email,username,password,confirm)
if(!errorisexits){

throw new UserInputError("error",{errors})

}
//usernameexits
const userexits=await User.findOne({username})
if(userexits){
  throw new UserInputError("username is taken",
  {
    errors:{

    username:"username is taken"
  }
})
}



//HashPass
const hashpassword= await bcrypt.hash(password,12)

const newuser= new User({
    email,
    password:hashpassword,
    username,
    createdAt:new Date().toISOString()



})

const res= await newuser.save()
   
  const token=createToken(res)


return {
token,
id:res._id,
...res._doc,


}

}


}



}