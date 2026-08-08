const express = require("express")
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const movieRoutes = require("./routes/movieRoutes");
dotenv.config();

const app = express()
app.use(express.json());


app.get("/",movieRoutes)
app.post("/addMovie",movieRoutes)

connectDB();

app.listen(process.env.PORT,()=>{
    console.log(`Server is Running on ${process.env.PORT}`)
})
