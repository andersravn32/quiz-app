const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// POST: /auth/signin, handles signin requests, return accessToken, refreshToken and user data
router.post(
  "/signin",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  require("../controllers/signin")
);

// POST: /auth/signup, handles up requests, returns accessToken and user data if signup was successful
router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  require("../controllers/signup")
);

// POST: /auth/signup, handles up requests, returns accessToken and user data if signup was successful
router.post(
  "/signout",
  body("token").isJWT(),
  require("../controllers/signout")
);

// POST: /auth/refresh, handles refresh requests, returns new accessToken and fresh user data
router.post(
  "/refresh",
  body("token").isJWT(),
  require("../controllers/refresh")
);

module.exports = router;
