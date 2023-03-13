const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const check = require("../middleware/check");

router.get("/", require("../controllers/category.get"));

router.post(
  "/",
  check.role(1),
  body("title").isLength({ min: 4, max: 20 }),
  body("description").isLength({ min: 4, max: 200 }),
  body("public").isBoolean(),
  require("../controllers/category.post")
);

router.put(
  "/:id",
  check.role(1),
  body("title").isLength({ min: 4, max: 20 }),
  body("description").isLength({ min: 4, max: 200 }),
  body("public").isBoolean(),
  require("../controllers/category.put")
);

router.delete("/:id", check.role(1), require("../controllers/category.delete"));

module.exports = router;
