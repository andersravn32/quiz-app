const express = require("express");
const router = express.Router();
const check = require("../middleware/check")

// Primary auth route
router.use("/auth", require("./auth"));

// Primary category route
router.use("/category", check.auth, require("./category"))

// Primary profile route
router.use("/profile", check.auth, require("./profile"));

// Primary quiz route
router.use("/quiz", check.auth, require("./quiz"));

// Primary answer route
router.use("/answer", check.auth, require("./answer"));
module.exports = router;