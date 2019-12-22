const express = require("express");
const Film = require("../model/film");
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        if (req.query.title) {
            const allFilm = await Film.find({ title: req.query.title })
            return res.json(allFilm)
        };
        const allFilms = await Film.find();
        return res.status(200).json({ film: allFilms });
    } catch (err) {
        return res.status(400).json({ message: "Film not found" });
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const idFilm = await Film.findById(req.params.id);
        if (!idFilm) {
            return "No film with this id found!";
        }
        return res.status(200).json({ message: "Film fetched successfully!", user: idFilm })
    } catch (err) {
        return res.status(404).json({ message: "Film not found!", err });
    }
});

router.post("", async (req, res, next) => {
    const film = new Film({
        title: req.body.title,
        gender: req.body.gender,
        exitDate: req.body.exitDate,
        duration: req.body.duration,
        cast: req.body.cast,
        direction: req.body.direction,
        startingTime: req.body.startingTime,
    });
    try {
        if (req.body.title && req.body.gender && req.body.exitDate && req.body.duration && req.body.cast && req.body.direction && req.body.startingTime) {
            const moviePresent = await Film.findOne({ title: req.body.title })
            if (moviePresent) { return res.status(400).json({ message: "Film present" }) }
            await film.save();
            res.status(201).json({ message: "Film added successfully!", film: film })
        }
    } catch (err) {
        return res.status(404).json({ message: "Incorrect entry", err })
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        if (req.body) {
            if (await Film.findOne({ title: req.body.title })) {
                return res.status(400).json({ message: "This title already exists" });
            }
            const film = await Film.findById(req.params.id);
            if (!film) {
                throw "No film found for editing!";
            }
            const filmUpdated = new Film({
                _id: req.params.id,
                title: req.body.title ? req.body.title : film.title,
                gender: req.body.gender ? req.body.gender : film.gender,
                exitDate: req.body.exitDate ? req.body.exitDate : film.exitDate,
                duration: req.body.duration ? req.body.duration : film.duration,
                cast: req.body.cast ? req.body.cast : film.cast,
                direction: req.body.direction ? req.body.direction : film.direction,
                startingTime: req.body.startingTime ? req.body.startingTime : film.startingTime,
            });
            await Film.updateOne({ _id: req.params.id }, filmUpdated);
            return res.status(200).json({
                message: "Film updated successfully",
                film: filmUpdated
            })
        }
    }
    catch (err) {
        return res.status(404).json({ message: "Error!", err });
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const deleteFilm = await Film.deleteOne({ _id: req.params.id })
        if (!deleteFilm) {
            throw "No film found for deletion!";
        }
        return res.status(200).json({ message: "Film deleted successfully!" });
    }
    catch (err) {
        res.status(404).json({ message: err });
    }
})
module.exports = router;
