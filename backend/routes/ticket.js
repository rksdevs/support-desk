const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
} = require("../controllers/ticketController");

//Re-routing to notes router
const noteRouter = require("./note");
router.use("/:ticketId/notes", noteRouter);

// router
//   .route("/")
//   .get(authMiddleware, getTickets)
//   .post(authMiddleware, createTicket);

//Get all tickets
router.get("/", authMiddleware, getTickets);

//Create Ticket
router.post("/", authMiddleware, createTicket);

//Get one ticket
router.get("/:id", authMiddleware, getTicket);

//Delete Ticket
router.delete("/:id", authMiddleware, deleteTicket);

//Update Ticket
router.put("/:id", authMiddleware, updateTicket);

module.exports = router;
