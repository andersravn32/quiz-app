const jwt = require("jsonwebtoken");
const database = require("../utilities/database");

module.exports = async (req, res) => {
  const key = jwt.sign(
    {
      type: "api",
      uuid: req.user.uuid,
      role: req.user.role,
    },
    process.env.JWT_API,
    {
      expiresIn: process.env.JWT_API_EXPIRES,
    }
  );

  try {
    // Get database connection
    const db = database.get();

    const keys = await db
      .collection("tokens")
      .find({ $and: [{ type: "api" }, { user: req.user.uuid }] })
      .toArray();

    if (keys.length >= 5) {
      return res.json({
        error:
          "Max number of keys have been generated, please invalidate old keys before creating new ones",
      });
    }

    // Token insert
    const insertQuery = await db.collection("tokens").insertOne({
      type: "api",
      user: req.user.uuid,
      token: key,
    });

    if (!(insertQuery.acknowledged && insertQuery.insertedId)) {
      return res.json({ error: "An error occurred" });
    }

    return res.json({
      message: "Successfully created new api key",
      data: insertQuery,
      key: key,
    });
  } catch (error) {
    console.log(error);
  }
};
