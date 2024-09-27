const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require('../models/userModel');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

router.post("/", async (req, res) => {
    const { fname, lname, email, message,phone } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const newUser = await User.create({ fname, lname, email, message,phone });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { fname, lname, email,  message,phone } = req.body;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, { fname, lname, email, message,phone }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
