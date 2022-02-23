const express = require("express")

app = express()
app.get('/',(req,res)=>{
    res.send('Hello Bro')
})
app.listen(process.env.PORT,()=>console.log("running"))