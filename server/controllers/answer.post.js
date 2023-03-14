const { ObjectId } = require("mongodb");
const database = require("../utilities/database");
const {validationResult} = require("express-validator");

module.exports = async (req, res) => {
  const errors = validationResult(req);

  // Handle errors from express validator
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }

  const answer = {
    creator: req.user.uuid,
    created: new Date(),
    quiz: req.body.quiz,
    answers: req.body.answers,
    public: req.body.public,
  };

  try {
    // Get database connection
    const db = database.get();

    // Ensure that quiz exists
    const quiz = await db
      .collection("quizzes")
      .findOne({ _id: new ObjectId(req.body.quiz) });

    if (!quiz) {
      return res.json({
        error: "Quiz was not found",
      });
    }

    // Insert answer into database
    const insertQuery = await db.collection("answers").insertOne(answer);

    if (!(insertQuery.acknowledged && insertQuery.insertedId)) {
      return res.json({ error: "An error occurred" });
    }

    return res.json({
      message: "Successfully created new answer",
      data: insertQuery,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: error,
    });
  }
};
