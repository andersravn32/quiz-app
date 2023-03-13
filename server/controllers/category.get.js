const database = require("../utilities/database");

module.exports = async (req, res) => {
  try {
    // Get active database connection
    const db = database.get();

    // Get every category
    const categories = await db
      .collection("categories")
      .find(req.user.role >= 1 ? {} : { public: false })
      .toArray();

    // Return categories to user
    return res.json(categories);
  } catch (error) {
    console.log(error);
    return res.json({
      error: error,
    });
  }
};
