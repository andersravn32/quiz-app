const database = require("../utilities/database");

module.exports = async (req, res) => {
  try {
    // Get active database connection
    const db = database.get();

    // Get every answer related to your account
    const answers = await db
      .collection("answers")
      .find({ creator: req.user.uuid })
      .toArray();

    // Return answers to user
    return res.json(answers);
  } catch (error) {
    console.log(error);
    return res.json({
      error: error,
    });
  }
};
