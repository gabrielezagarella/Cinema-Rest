const express = require("express");
const Ticket = require("../model/ticket");
const router = express.Router();

router.get("", async (req, res, next) => {
    try {
        const allTickets = await Ticket.find();
        return res.status(200).json({ ticket: allTickets });
    } catch (err) {
        return res.status(400).json({ message: "Ticket not found" });
    }
});

router.get("/:id", async (req, res, next) => {
    const ticket = await Ticket.findById(req.params.id)
    try {
        if (!ticket) {
            return "No ticket with this id foun!";
        }
        return res.status(200).json({ message: "Ticket fetched successfully!", ticket: ticket });
    }
    catch (err) {
        res.status(404).json({ message: "Ticket not found!" });
    }
});

router.post("", async (req, res, next) => {
    const ticket = new Ticket({
        film: req.body.film,
        startingTime: req.body.startingTime,
    });
    try {
        if (req.body.film && req.body.startingTime) {
            await ticket.save();
            res.status(201).json({ message: "Ticket added successfully!", ticket: ticket });
        }
    }
    catch (err) {
        return res.status(404).json({ message: "Incorrect entry", err });
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const deleteTicket = await Ticket.deleteOne({ _id: req.params.id })
        if (!deleteTicket) {
            throw "No ticket found for deletion!";
        }
        return res.status(200).json({ message: "Ticket deleted successfully!" });
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

module.exports = router;