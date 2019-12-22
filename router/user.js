const express = require("express");
const User = require("../model/user");
const router = express.Router();

router.get("", async (req, res, next) => {
    try {
        if (req.query.name) {
            const allUser = await User.find({ name: req.query.name })
            return res.json(allUser)
        };
        const allUsers = await User.find();
        return res.status(200).json({ user: allUsers });
    } catch (err) {
        return res.status(400).json({ message: "User not found" });
    }
});

router.get("/:id", async (req, res, next) => {
    const user = await User.findById(req.params.id)
    try {
        if (!user) {
            return "No user with this id foun!";
        }
        return res.status(200).json({ message: "User fetched successfully!", user: user });
    }
    catch (err) {
        res.status(404).json({ message: "User not found!" });
    }
});

router.post("", async (req, res, next) => {
    const user = new User({
        name: req.body.name,
    });
    try {
        if (req.body.name) {
            await user.save();
            res.status(201).json({ message: "User added successfully!", user: user });
        }
    }
    catch (err) {
        return res.status(404).json({ message: "Incorrect entry", err });
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw "No user found for editing!";
        }
        const userUpdated = new User({
            _id: req.params.id,
            name: req.body.name ? req.body.name : user.name
        });
        await User.updateOne({ _id: req.params.id }, userUpdated)
        return res.status(200).json({ message: "User updated successfully", user: userUpdated });
    } catch (err) {
        return res.status(404).json({ message: "Error!", err });
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const deleteUser = await User.deleteOne({ _id: req.params.id })
        if (!deleteUser) {
            throw "No film found for deletion!";
        }
        return res.status(200).json({ message: "User deleted successfully!" });
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

module.exports = router;