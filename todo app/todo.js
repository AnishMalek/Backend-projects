const express=require('express')

const app=express()

const todoList= require('./data/todo-data')

app.use(express.urlencoded({extended:true}))

app.set("view engine","ejs")

app.get("/",(req,res)=>{
 res.render("index",{todoList})   
})


app.get("/add",(req,res)=>{
    res.render("add")
})

app.post("/add",(req,res)=>{
    const {task,status}=req.body

    todoList.push({
        id:todoList.length + 1,
        task,
        status
    })

    res.redirect("/")
})

app.get("/edit/:id",(req,res)=>{
    const data=todoList.find((task=>task.id==req.params.id))
    res.render('edit',{data})
})

app.post('/edit/:id',(req,res)=>{
    const data=todoList.find((task=>task.id==req.params.id))
      data.task=req.body.task
      data.status=req.body.status

      res.redirect("/")
})

app.get("/delete/:id",(req,res)=>{
    const index=todoList.findIndex((t)=>t.id==req.params.id)
    todoList.splice(index,1)
    res.redirect('/')
})

app.listen(3000,()=>{
    console.log("server is running on http://localhost:3000");
    
})
