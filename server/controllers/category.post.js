const database = require("../utilities/database");
const { validationResult } = require("express-validator");

module.exports = async (req, res) => {
  const errors = validationResult(req);

  // Handle errors from express validator
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }
  const category = {
    title: req.body.title,
    description: req.body.description,
    public: req.body.public,
    creator: req.user.uuid,
    created: new Date(),
  };

  try {
    // Get database connection
    const db = database.get();

    const categoryInsert = await db
      .collection("categories")
      .insertOne(category);

    if (!(categoryInsert.acknowledged && categoryInsert.insertedId)) {
      return res.json({ error: "An error occurred" });
    }

    return res.json({
      message: "Successfully created new category",
      data: categoryInsert,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: error,
    });
  }
};
