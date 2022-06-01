const log = (req)=>{
    //console.log(req)
    console.log(req.headers['user-agent'] +"...."+req.originalUrl)
}
module.exports = log