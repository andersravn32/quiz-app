const express = require("express");
const router = express.Router();

// Primary auth route
router.use("/auth", require("./auth"));


module.exports = router;