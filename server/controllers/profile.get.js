const database = require("../utilities/database");

module.exports = async (req, res) => {
  try {
    // Get database connection
    const db = database.get();

    // Fetch profile data from database
    const profile = await db
      .collection("users")
      .findOne({ identifier: req.params.identifier });

    // Delete sensitive information
    delete profile.password;
    delete profile.uuid;

    // Return profile object
    return res.json({
      data: profile,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: error,
    });
  }
};
