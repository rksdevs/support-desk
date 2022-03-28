const express = require("express");
const router = express.Router({ mergeParams: true });
const authMiddleware = require("../middleware/authMiddleware");
const { getNotes, addNote } = require("../controllers/noteController");

router.route("/").get(authMiddleware, getNotes).post(authMiddleware, addNote);

module.exports = router;
