const express = require("express");
const check = require("../../middleware/check");
const router = express.Router();

router.use("*", check.api, (req, res) => {
    res.send(`<img src="https://media.tenor.com/3sscVvNm9zkAAAAC/controlmypc-cat.gif" alt="meme">`);
});

module.exports = router;