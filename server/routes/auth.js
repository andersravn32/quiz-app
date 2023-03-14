const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const check = require("../middleware/check");

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
  body("identifier").isLength({ min: 5, max: 50 }),
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

// Get API keys
router.get("/api", check.auth, require("../controllers/api.get"));

// Create new API key
router.post("/api", check.auth, require("../controllers/api.post"));

// Delete API key
router.delete(
  "/api",
  check.auth,
  body("token").isJWT(),
  require("../controllers/api.delete")
);

module.exports = router;
