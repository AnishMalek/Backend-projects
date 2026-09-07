require("dotenv").config();

const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const connectDB = require("./config/db");
const { seedAdmin } = require("./utils/seedAdmin");

const app = express();

connectDB().then(seedAdmin);

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(session({
  secret: process.env.SESSION_SECRET || "dev_secret",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 }
}));

app.use(flash());

// Make flash messages and logged-in admin available to every EJS page.
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.info = req.flash("info");
  res.locals.warning = req.flash("warning");
  res.locals.admin = req.session.admin || null;
  next();
});

app.use("/", require("./routes/authRoutes"));
app.use("/admin", require("./routes/adminRoutes"));
app.use("/admin/categories", require("./routes/categoryRoutes"));
app.use("/admin/subcategories", require("./routes/subcategoryRoutes"));
app.use("/admin/products", require("./routes/productRoutes"));

app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});