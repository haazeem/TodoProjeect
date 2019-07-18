const express = require('express');
const bodyParser = require('body-parser');


const bcryt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const formidable = require('formidable');

const User = require('../models/user');
const config = require('./../db/config');


var app = express();
app.use(bodyParser.json());



app.get("/", (req, res) => {
    res.send("<h2>Welcome to user controller </h2>")


});
app.post("/inscription", (req, res) => {
    req.body._password = bcryt.hashSync(req.body._password, 12);
    data = new User({
        nom: req.body._nom,
        prenom: req.body._prenom,
        email: req.body._email,
        password: req.body._password,
        telephone: req.body._telephone
    });
    data.save().then(() => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(400).send({
            mesg: "Erreur : " + err
        });
    });

});

app.post("/connexion", (req, res) => {
    let email = req.body._email;
    let password = req.body._password;
    User.findOne({ email }).then((user) => {
        if (!user) {
            res.status(404).send({
                msg: "Email Incorrect "
            })
        } else {
            if (!bcryt.compareSync(password, user.password)) {
                res.status(404).send({ msg: "mot de passe incorrecte " });
            }
            console.log(user.isActivated)
            if (!user.isActivated)
                res.status(404).send({ msg: "Compte Désactivé" });
            let token = jwt.sign({ idUser: user._id, role: user.role }, "hazem").toString();
            let status = true
            let _id = user._id;
            let dateConnexion = Date.now()
            User.findOneAndUpdate({ _id }, { $set: { status, dateConnexion } }).then((res) => {

            }).catch((err) => { });

            res.status(200).send({ token });
        }

    }).catch((err) => {
        console.log(err)
        res.status(404).send({
            mesg: "Erreur : " + err
        });
    })
});


app.post("/deconnexion", (req, res) => {
    let token = req.headers['authorization'];
    let _id = jwt.verify(token, "hazem").idUser;
    let status = false;
    let dateDeconnexion = Date.now();
    User.findOneAndUpdate({ _id }, { $set: { status, dateDeconnexion } }).then((res) => {
    }).catch((err) => { });
})


module.exports = app;

