const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const check = require("../middleware/check");

router.get("/", require("../controllers/quiz.get"));

router.post(
  "/",
  check.role(1),
  body("title").isLength({ min: 5, max: 50 }),
  body("category").isLength({ min: 24, max: 24 }),
  body("questions").isArray(),
  body("questions").isLength(1),
  body("public").isBoolean(),
  require("../controllers/quiz.post")
);

module.exports = router;
