const bcrypt = require("bcrypt");
const database = require("../utilities/database");

module.exports = async (req, res) => {
  if (!(req.params.identifier == req.user.identifier)) {
    return res.json({
      error: "Failed to update profile",
    });
  }

  // Set profile object with hashed password
  const profile = {
    ...req.body,
    password: await bcrypt.hash(req.body.password, 10),
  };

  try {
    // Get database connection
    const db = database.get();

    const updateQuery = await db
      .collection("users")
      .updateOne({ identifier: req.params.identifier }, { $set: profile });

    if (!updateQuery.acknowledged) {
      return res.json({ error: "An error occurred" });
    }

    return res.json({
      message: "Successfully updated profile",
      data: updateQuery,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: error,
    });
  }
};
