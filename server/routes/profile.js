const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

router.get("/:identifier", require("../controllers/profile.get"));

router.put(
  "/:identifier",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  require("../controllers/profile.put")
);

router.delete("/:identifier", require("../controllers/profile.delete"));

module.exports = router;
