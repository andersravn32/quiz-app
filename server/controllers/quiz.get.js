const database = require("../utilities/database");

module.exports = async (req, res) => {
  try {
    // Get active database connection
    const db = database.get();

    // Get every quizzes
    const quizzes = await db
      .collection("quizzes")
      .find(req.user.role >= 1 ? {} : { public: true })
      .toArray();

    // Return quizzes to user
    return res.json(quizzes);
  } catch (error) {
    console.log(error);
    return res.json({
      error: error,
    });
  }
};
