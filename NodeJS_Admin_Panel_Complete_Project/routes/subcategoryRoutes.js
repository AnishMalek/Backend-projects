const express = require("express");
const router = express.Router();
const auth = require("../middleware/adminAuth");
const controller = require("../controllers/subcategoryController");

router.use(auth);

router.get("/", controller.list);
router.get("/add", controller.showAdd);
router.post("/add", controller.create);
router.get("/edit/:id", controller.showEdit);
router.post("/edit/:id", controller.update);
router.get("/delete/:id", controller.delete);

module.exports = router;