const fs = require("fs");
const path = require("path");

const blogsFile = path.join(__dirname, "../data/blogs.json");

const getBlogs = () => {
    const data = fs.readFileSync(blogsFile, "utf-8");
    return JSON.parse(data);
};

const saveBlogs = (blogs) => {
    fs.writeFileSync(blogsFile, JSON.stringify(blogs, null, 4));
};

const blogList = (req, res) => {
    const blogs = getBlogs();
    res.render("blogs/list", { blogs });
};

const addBlogPage = (req, res) => {
    res.render("blogs/add");
};

const addBlog = (req, res) => {
    const { title, author, category, content } = req.body;
    const blogs = getBlogs();

    const newBlog = {
        id: blogs.length > 0 ? blogs[blogs.length - 1].id + 1 : 1,
        title,
        author,
        category,
        content,
        createdAt: new Date().toLocaleDateString()
    };

    blogs.push(newBlog);
    saveBlogs(blogs);

    res.redirect("/blogs");
};

const editBlogPage = (req, res) => {
    const id = Number(req.params.id);
    const blogs = getBlogs();

    const blog = blogs.find(blog => blog.id === id);

    if (!blog) {
        return res.status(404).send("Blog not found.");
    }

    res.render("blogs/edit", { blog });
};

const updateBlog = (req, res) => {
    const id = Number(req.params.id);
    const { title, author, category, content } = req.body;
    const blogs = getBlogs();

    const blogIndex = blogs.findIndex(blog => blog.id === id);

    if (blogIndex === -1) {
        return res.status(404).send("Blog not found.");
    }

    blogs[blogIndex] = {
        ...blogs[blogIndex],
        title,
        author,
        category,
        content
    };

    saveBlogs(blogs);
    res.redirect("/blogs");
};

const deleteBlog = (req, res) => {
    const id = Number(req.params.id);
    const blogs = getBlogs();

    const blogExists = blogs.some(blog => blog.id === id);

    if (!blogExists) {
        return res.status(404).send("Blog not found.");
    }

    const updatedBlogs = blogs.filter(blog => blog.id !== id);

    saveBlogs(updatedBlogs);
    res.redirect("/blogs");
};

module.exports = {
    blogList,
    addBlogPage,
    addBlog,
    editBlogPage,
    updateBlog,
    deleteBlog
};