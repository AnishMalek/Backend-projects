const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    blogList,
    addBlogPage,
    addBlog,
    editBlogPage,
    updateBlog,
    deleteBlog
} = require("../controllers/blogController");

router.get("/", authMiddleware, blogList);

router.get("/add", authMiddleware, addBlogPage);
router.post("/add", authMiddleware, addBlog);

router.get("/edit/:id", authMiddleware, editBlogPage);
router.post("/edit/:id", authMiddleware, updateBlog);

router.get("/delete/:id", authMiddleware, deleteBlog);

module.exports = router;