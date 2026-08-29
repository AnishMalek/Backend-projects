const express = require("express");
const router = express.Router();

const Blog = require("../models/Blog");
const isAuthenticated = require("../middleware/auth");

// Blog list - public route
router.get("/blogs", async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate("createdBy")
            .sort({ createdAt: -1 });

        // req.user authenticated user mate available hoy chhe
        res.render("blogs", {
            blogs,
            user: req.user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error loading blogs");
    }
});

// Add Blog page - restricted
router.get("/add-blog", isAuthenticated, (req, res) => {
    res.render("add-blog");
});

// Add Blog - restricted
router.post("/add-blog", isAuthenticated, async (req, res) => {
    try {
        const { title, description } = req.body;

        const newBlog = new Blog({
            title,
            description,
            // Logged-in user ni ID store karo
            createdBy: req.user._id
        });

        await newBlog.save();

        res.redirect("/blogs");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error adding blog");
    }
});

// Edit page - restricted
router.get("/edit-blog/:id", isAuthenticated, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        // Only owner can edit
        if (blog.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).send("You are not allowed to edit this blog.");
        }

        res.render("edit-blog", { blog });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error loading blog");
    }
});

// Update blog - restricted + owner check
router.post("/edit-blog/:id", isAuthenticated, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        if (blog.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).send("You are not allowed to edit this blog.");
        }

        blog.title = req.body.title;
        blog.description = req.body.description;

        await blog.save();

        res.redirect("/blogs");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error updating blog");
    }
});

// Delete blog - restricted + owner check
router.post("/delete-blog/:id", isAuthenticated, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        if (blog.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).send("You are not allowed to delete this blog.");
        }

        await Blog.findByIdAndDelete(req.params.id);

        res.redirect("/blogs");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error deleting blog");
    }
});

module.exports = router;
