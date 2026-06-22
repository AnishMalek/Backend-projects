const express = require ("express")
const path = require("path")


const app=express()

//middlewares
const isAdmin=((req,res,next)=>{
    const user={
        name:"adminuser",
        role:"user"

   }

   if(user.role=="admin"){
     next()
   }

   else{
    res.send("<h1>Unauthorized person</h1>")
   }
})

app.use(express.static(path.join(__dirname,'public')))

app.get("/admin-dasboard",isAdmin,(req,res)=>{
    res.send("<h1>Welcome to Admin Dashboard</h1>")
})

app.listen(3000,()=>{
    console.log("server is running on http://localhost:3000");
    
})