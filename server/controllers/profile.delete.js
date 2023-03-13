const database = require("../utilities/database");

module.exports = async (req, res) => {
  if (!(req.params.identifier == req.user.identifier)) {
    return res.json({
      error: "Failed to delete profile",
    });
  }

  try {
    // Get database connection
    const db = database.get();

    const user = await db
      .collection("users")
      .findOne({ identifier: req.params.identifier });

    // Perform deletion
    const profileDeletion = await db
      .collection("users")
      .deleteOne({ identifier: user.identifier });
    const tokenDeletion = await db
      .collection("tokens")
      .deleteMany({ user: user.uuid });
    const categoryDeletion = await db
      .collection("categories")
      .deleteMany({ creator: user.uuid });

    /* TODO: Add quizzes deletion query */

    return res.json({
      message: "Deleted profile and accompanying data",
      queries: [profileDeletion, tokenDeletion, categoryDeletion],
    });
  } catch (error) {
    console.log(error)
  }
};
