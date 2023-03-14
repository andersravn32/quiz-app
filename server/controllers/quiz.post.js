const database = require("../utilities/database");
const { validationResult } = require("express-validator");
module.exports = async (req, res) => {
  const errors = validationResult(req);

  // Handle errors from express validator
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }

  const quiz = {
    title: req.body.title,
    category: req.body.category,
    creator: req.user.uuid,
    created: new Date(),
    questions: req.body.questions,
    public: req.body.public,
  };

  try {
    // Get database connection
    const db = database.get();

    const insertQuery = await db.collection("quizzes").insertOne(quiz);

    if (!(insertQuery.acknowledged && insertQuery.insertedId)) {
      return res.json({ error: "An error occurred" });
    }

    return res.json({
      message: "Successfully created new quiz",
      data: insertQuery,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: error,
    });
  }
};
