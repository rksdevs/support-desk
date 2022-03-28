const { validationResult } = require("express-validator");
const User = require("../models/User");
const Ticket = require("../models/Ticket");
const Note = require("../models/Note");

//@desc Get Notes
//@route GET/api/tickets/:ticketId/notes
//@access Private
const getNotes = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await User.findById(req.userId); //userId is from authMiddleware line 15

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.userId) {
    return res.status(400).json({ message: "User not authorized" });
  }

  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
};

//@desc Add a Note
//@route POST/api/tickets/:ticketId/notes
//@access Private
const addNote = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await User.findById(req.userId); //userId is from authMiddleware line 15

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.userId) {
    return res.status(400).json({ message: "User not authorized" });
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.userId,
  });

  res.status(200).json(note);
};

module.exports = {
  getNotes,
  addNote,
};
