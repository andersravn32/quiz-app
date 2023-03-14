const database = require("../utilities/database");

module.exports = async (req, res) => {
  try {
    // Get active database connection
    const db = database.get();

    const deletionQuery = await db
      .collection("tokens")
      .deleteOne({
        $and: [
          { token: req.body.token },
          { user: req.user.uuid },
          { type: "api" },
        ],
      });
    // Return keys to user
    return res.json({
        message: "Successfully deleted API key",
        data: deletionQuery
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: error,
    });
  }
};
