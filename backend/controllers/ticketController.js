const { validationResult } = require("express-validator");
const User = require("../models/User");
const Ticket = require("../models/Ticket");

//@desc Get Tickets
//@route GET/api/tickets
//@access Private
const getTickets = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findById(req.userId); //userId is from authMiddleware line 15

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const tickets = await Ticket.find({ user: req.userId });

    res.status(200).json(tickets);
  } catch (error) {
    return res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
  }
};

//@desc Create Tickets
//@route POST/api/tickets
//@access Private
const createTicket = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // const user = await User.findById(req.userId); //userId is from authMiddleware line 15

    const { product, description } = req.body;

    if (!product || !description) {
      return res
        .status(400)
        .json({ message: "Please add a product and a description" });
    }

    const user = await User.findById(req.userId); //userId is from authMiddleware line 15

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const ticket = await Ticket.create({
      product,
      description,
      user: req.userId,
      status: "new",
    });

    res.status(200).json({ ticket });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
  }
};

//@desc Get one Ticket based on the id
//@route GET/api/tickets/:id
//@access Private
const getTicket = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findById(req.userId); //userId is from authMiddleware line 15

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const ticket = await Ticket.findById(req.params.id);

    //If ticket id is not found
    if (!ticket) {
      return res.status(400).json({ message: "Ticket not found" });
    }

    //To validate if it is the same user who has raised the ticket
    if (ticket.user.toString() !== req.userId) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
  }
};

//@desc Delete one Ticket based on the id
//@route DELETE/api/tickets/:id
//@access Private
const deleteTicket = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findById(req.userId); //userId is from authMiddleware line 15

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const ticket = await Ticket.findById(req.params.id);

    //If ticket id is not found
    if (!ticket) {
      return res.status(400).json({ message: "Ticket not found" });
    }

    //To validate if it is the same user who has raised the ticket
    if (ticket.user.toString() !== req.userId) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    await ticket.remove();

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
  }
};

//@desc Update a Ticket based on the id
//@route PUT/api/tickets/:id
//@access Private
const updateTicket = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findById(req.userId); //userId is from authMiddleware line 15

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const ticket = await Ticket.findById(req.params.id);

    //If ticket id is not found
    if (!ticket) {
      return res.status(400).json({ message: "Ticket not found" });
    }

    //To validate if it is the same user who has raised the ticket
    if (ticket.user.toString() !== req.userId) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ); // {new: true} - creates a new ticket, if there isnt a ticket

    res.status(200).json(updatedTicket);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
  }
};

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
};
