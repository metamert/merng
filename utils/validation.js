module.exports.validationregister=(
email,username,password,confirm


)=>{
const errors={}

if(email.trim()===""){
    errors.email="email must not be empty"
}else{
const regEx= /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
if(!email.match(regEx)){

    errors.email2="email is not valid"
}

}
if(username.trim()===""){
errors.username="username must not be empty"

}
if(password.trim()===""){
errors.password="password must not be empty"


}
else{
    
    if(password!==confirm){
errors.confirm="passwords dont match each other"

}




}

return{
errors,
errorisexits:Object.keys(errors).length<1

}

}
module.exports.validationsignin=(email,password)=>{
const Signerrors={}
console.log(email)
if(email.trim()===""){

    Signerrors.username="email must not be empty"
}
if(password.trim()===""){
    Signerrors.password="password must not be empty"
}


return{
Signerrors,
Signerrorsexits: Object.keys(Signerrors).length<1

}

}


