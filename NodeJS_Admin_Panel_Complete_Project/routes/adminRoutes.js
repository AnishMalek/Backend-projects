const express = require("express");
const router = express.Router();
const auth = require("../middleware/adminAuth");
const controller = require("../controllers/adminController");

router.use(auth);

router.get("/dashboard", controller.dashboard);

router.get("/profile", controller.profile);
router.post("/profile/update", controller.updateProfile);

router.get("/change-password", controller.showChangePassword);
router.post("/change-password", controller.changePassword);

module.exports = router;