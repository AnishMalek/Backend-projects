const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movieController")


router.get("/",movieController.home)
router.post("/addMovie",movieController.addMovie)

module.exports = router;
