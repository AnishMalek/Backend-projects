import http from 'http'
import dotenv from 'dotenv'

dotenv.config()

const server = http.createServer((req,res)=>{
    if(req.url==="/"){
        res.writeHead(200,{"content":"/html"})
        res.end("welcome to home page")

    }
     else if(req.url==="/about"){
        res.writeHead(200,{"content":"/html"})
        res.end("welcome to about page")
        
    }
     else if(req.url==="/services"){
        res.writeHead(200,{"content":"/html"})
        res.end("welcome to services page")
        
    }
     
})

    const PORT=process.env.PORT;
    server.listen(PORT,()=>{
console.log(`Server running on http://localhost:${PORT}`);
    } 
    )


