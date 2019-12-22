const express = require("express");
const Cinema = require("../model/cinema");
const Film = require("../model/film");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        if (req.query.name) {
            const allCinema = await Cinema.find({ name: req.query.name })
            return res.json(allCinema)
        };
        if (req.query.place) {
            const allCinema = await Cinema.find({ name: req.query.place })
            return res.json(allCinema)
        };
        const allCinema = await Cinema.find().populate("film");
        const chats = allCinema.filter(name => {
            return allCinema.includes(name)
        })
        return res.status(200).json({ message: "Cinema found", cinema: chats });
    } catch (err) {
        return res.status(400).json({ message: "Cinema not found" });
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const idCinema = await Cinema.findById(req.params.id).populate("film");
        if (!idCinema) {
            return "No cinema with this id found!";
        }
        return res.status(200).json({ message: "Cinema fetched successfully!", cinema: idCinema })
    } catch (err) {
        return res.status(404).json({ message: "Cinema not found!", err });
    }
});
router.get("/:id/film", async (req, res, next) => {
    try {
        const cinema = await Cinema.findById(req.params.id).populate("film")
        if (!cinema) {
            throw "No cinema with this id found!";
        }
        if (!cinema.film) {
            throw "No film found!";
        }
        return res.status(200).json({ message: "Cinema fetched successfully!", film: cinema })
    } catch (err) {
        return res.status(404).json({ message: "Cinema not found!", err });
    }
});

router.post("", async (req, res, next) => {
    const cinema = new Cinema({
        name: req.body.name,
        place: req.body.place,
        film: [],
        ticket: [],
    });
    try {
        if (req.body.name && req.body.place) {
            const namePresent = await Cinema.findOne({ name: req.body.name })
            if (namePresent) { return res.status(400).json({ message: "Name of cinema present" }) }
            const placePresent = await Cinema.findOne({ place: req.body.place })
            if (placePresent) { return res.status(400).json({ message: "Place of cinema present" }) }
            await cinema.save();
            res.status(201).json({ message: "Cinema added successfully!", cinema: cinema })
        }
    } catch (err) {
        return res.status(404).json({ message: "Incorrect entry", err })
    }
});
router.post(":id/film", async (req, res, next) => {

    if (req.body) {
        const cinema = await Cinema.findById(req.params.id);
        if (!cinema) {
            throw "No cinema found for editing!";
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
        const films = await Cinema.updateOne({ _id: req.params.id },
            {
                $addToSet: {
                    films: {
                        $each: film
                    }
                }
            },
            { new: true }
        ).populate("film");
        if (!films) {
            throw "Impossible to update";
        }
        return res.status(200).json({
            message: "Film updated successfully",
            film: filmUpdated
        })
    }
})

router.put("/:id", async (req, res, next) => {
    try {
        if (req.body) {
            if (await Cinema.findOne({ name: req.body.name })) {
                return res.status(400).json({ message: "This name already exists" });
            }
            const cinema = await Cinema.findById(req.params.id);
            if (!cinema) {
                throw "No cinema found for editing!";
            }
            const cinemaUpdated = new Cinema({
                _id: req.params.id,
                name: req.body.name ? req.body.name : cinema.name,
                place: req.body.place ? req.body.place : film.place,
            });
            await Cinema.updateOne({ _id: req.params.id }, cinemaUpdated);
            return res.status(200).json({
                message: "Cinema updated successfully",
                cinema: cinemaUpdated
            })
        }
    }
    catch (err) {
        return res.status(404).json({ message: "Error!", err });
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const deleteCinema = await Cinema.deleteOne({ _id: req.params.id })
        if (!deleteCinema) {
            throw "No cinema found for deletion!";
        }
        return res.status(200).json({ message: "Cinema deleted successfully!" });
    }
    catch (err) {
        res.status(404).json({ message: err });
    }
})
module.exports = router;
