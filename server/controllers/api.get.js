const database = require("../utilities/database");

module.exports = async (req, res) => {
  try {
    // Get active database connection
    const db = database.get();

    // Get every key related to your account
    const keys = await db
      .collection("tokens")
      .find({ $and: [{ type: "api", user: req.user.uuid }] })
      .toArray();

    // Return keys to user
    return res.json(
      keys.map((key) => {
        return key.token;
      })
    );
  } catch (error) {
    console.log(error);
    return res.json({
      error: error,
    });
  }
};
