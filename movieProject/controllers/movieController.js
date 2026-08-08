const Movie = require("../models/Movie");


const home = (req, res) => {
  res.send("Welcome to Movie Management System");
};

const addMovie = async (req, res) => {
  try {

     const {movieName,director,category,releaseYear,poster}=req.body;

      const movie = new Movie({movieName,director,category,releaseYear,poster})

   

    await movie.save();

  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  home,
  addMovie
};
