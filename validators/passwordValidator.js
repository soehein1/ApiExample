

const isPasswordValid=(password)=>{
    if(password.length<8 || password.length>15){
        return false
    }
    return true

}
module.exports=isPasswordValid