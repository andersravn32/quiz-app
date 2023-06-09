const database = require("../utilities/database");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// Scaffolded user object
/* 
Roles 
-1 = banned,
0 = base
1 = admin

*/
const USER = {
  uuid: null,
  firstName: null,
  lastName: null,
  identifier: null,
  email: null,
  password: null,
  role: 0,
};

module.exports = async (req, res) => {
  const errors = validationResult(req);

  // Handle errors from express validator
  if (!errors.isEmpty()) {
    return res.json({ error: errors.array() });
  }

  const user = {
    // Apply base user object
    ...USER,

    // Apply request body object
    ...req.body,

    // Update email to lowercase
    email: req.body.email,

    // Generate uuid for users
    uuid: crypto.randomUUID(),
  };

  try {
    const db = database.get();

    // Check database for duplicate entries
    const duplicates = await db.collection("users").findOne({
      $or: [{ email: user.email }, { identifier: user.identifier }],
    });

    // Return error if duplicate was found
    if (duplicates) {
      return res.json({ error: "E-mail or identifier is already in use" });
    }

    // Create hashed password
    user.password = await bcrypt.hash(user.password, 10);

    // Insert user data into database
    const userInsert = await db.collection("users").insertOne(user);
    if (!userInsert.insertedId) {
      return res.json({ error: "Failed to create account" });
    }

    // Delete hashed user password from user object after insert
    delete user.password;
    delete user._id;

    // Create accessToken
    const accessToken = jwt.sign(
      {
        type: "access",
        ...user,
      },
      process.env.JWT_AUTH,
      {
        expiresIn: process.env.JWT_AUTH_EXPIRES,
      }
    );

    // Create refreshToken
    const refreshToken = jwt.sign(
      {
        type: "refresh",
        uuid: user.uuid,
        email: user.email,
      },
      process.env.JWT_REFRESH,
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRES,
      }
    );

    // Insert refresh token into database
    const refreshInsert = await db.collection("tokens").replaceOne(
      { type: "refresh", user: user.uuid },
      {
        type: "refresh",
        user: user.uuid,
        token: refreshToken,
      },
      {
        upsert: true,
      }
    );

    if (!refreshInsert.acknowledged) {
      return res.json({
        error: "Failed to create account",
      });
    }

    // Return user data, accessToken and refreshToken to requesting user
    res.json({
      accessToken,
      refreshToken,
      user,
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};
