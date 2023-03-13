const express = require("express");
const router = express.Router();
const check = require("../middleware/check")

// Primary auth route
router.use("/auth", require("./auth"));

// Primary category route
router.use("/category", check.auth, require("./category"))
module.exports = router;