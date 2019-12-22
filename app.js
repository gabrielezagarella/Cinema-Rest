const express = require("express");
const bodyParse = require("body-parser");
const mongoose = require("mongoose");
const cinemaModel = require("./model/cinema")
const filmModel = require("./model/film")
const ticketModel = require("./model/ticket")
const filmsRouter = require("./router/film");
const userRouter = require("./router/user");
const cinemaRouter = require("./router/cinema");
const ticketRouter = require("./router/ticket");

const app = express();

app.use(bodyParse.json());

app.listen(4005, async () => {
    await mongoose.connect(address, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected successfully!")
    }).catch(error => {
        console.log("Error connection!")
    });
})

address = "mongodb://Gabriele:helloworld@football-shard-00-00-9yxib.mongodb.net:27017,football-shard-00-01-9yxib.mongodb.net:27017,football-shard-00-02-9yxib.mongodb.net:27017/film?ssl=true&replicaSet=football-shard-0&authSource=admin&retryWrites=true&w=majority"

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use("/films", filmsRouter);
app.use("/users", userRouter);
app.use("/cinema", cinemaRouter);
app.use("/tickets", ticketRouter);

// let newMat = new filmModel({ title: 'UN GIORNO DI PIOGGIA A NEW YORK', gender: 'Commedy', exitDate: 28 - 11 - 2019, duration: 92, cast: "Timothée Chalamet, Elle Fanning, Selena Gomez, Jude Law, Diego Luna", direction: "Woody Allen", startingTime: 16 });
// newMat.save().then(matchDat => {
//     console.log(matchDat);
//     let newUser = new ticketModel({ film: matchDat, startingTime: matchDat });
//     newUser.save().then(userData => {
//         console.log(userData);
//         let newMatch = new cinemaModel({ name: 'The-Space', place: "Belpasso", film: matchDat, ticket: userData });
//         newMatch.save().then(matchData => {
//             console.log(matchData);
//         })
//             .catch(err => console.log(err));
//     })
//         .catch(err => console.log(err));
// })
//     .catch(err => console.log(err));

