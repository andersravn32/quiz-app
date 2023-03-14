const { ObjectId } = require("mongodb");
const database = require("../utilities/database");
const { validationResult } = require("express-validator");

module.exports = async (req, res) => {
  const errors = validationResult(req);

  // Handle errors from express validator
  if (!errors.isEmpty()) {
    return res.json({ error: errors.array() });
  }

  const category = {
    title: req.body.title,
    description: req.body.description,
    public: req.body.public,
  };

  try {
    // Get database connection
    const db = database.get();

    const categoryUpdate = await db.collection("categories").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: category,
      }
    );

    if (!categoryUpdate.acknowledged) {
      return res.json({ error: "An error occurred" });
    }

    return res.json({
      message: "Successfully updated category",
      data: categoryUpdate,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: error,
    });
  }
};
