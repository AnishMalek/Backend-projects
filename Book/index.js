const express = require("express")
const mongoose = require("mongoose");


const app = express();

app.use(express.json());


mongoose
  .connect("mongodb://127.0.0.1:27017/BookStoreData")
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  category: String,
  stock: Number,
  published: Boolean,
  rating: Number,
}); 

const Book = mongoose.model("Book", bookSchema);

app.post("/books", async (req, res) => {
  const book = await Book.create(req.body);
  res.json(book);
});

app.get("/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.put("/books/:id", async (req, res) => {
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(book);
});

app.delete("/books/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);

  res.json({
    message: "Book Deleted Successfully",
  });
});


app.get("/",(req,res)=>{
    res.end("Home Page..")
})

app.listen(5000,()=>{
    console.log("Server is Running on port 5000")
})