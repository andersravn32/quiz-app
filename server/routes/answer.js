const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

router.get("/", require("../controllers/answer.get"));

router.post(
  "/",
  body("quiz").isLength({ min: 24, max: 24 }),
  body("answers").isArray(),
  body("public").isBoolean(),
  require("../controllers/answer.post")
);

module.exports = router;
