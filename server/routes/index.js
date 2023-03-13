const express = require("express");
const router = express.Router();
const check = require("../middleware/check")

// Primary auth route
router.use("/auth", require("./auth"));

// Primary category route
router.use("/category", check.auth, require("./category"))

// Primary profile route
router.use("/profile", check.auth, require("./profile"));

module.exports = router;