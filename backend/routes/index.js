var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  // debug("Test");
  res.status(200).json({ message: "Welcome to the support desk API" });
});

module.exports = router;
