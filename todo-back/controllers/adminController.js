const express = require('express');
const bodyParser = require('body-parser');


const bcryt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User = require('../models/user');



var app = express();
app.use(bodyParser.json());


app.post("/information", (req, res) => {
    let idUser = jwt.verify(req.headers['authorization'], "hazem").idUser;
    User.findById({ idUser }, (r, err) => {
        if (!err) {
            var info = getInformation(idUser);
            info.then(r => {
                res.status(200).send(r);
            })
        }
        else
            res.status(400).send();
    })

})
app.post("/activate", (req, res) => {
    let idUser = jwt.verify(req.headers['authorization'], "hazem").idUser;
    let isActivated = true;
    console.log(req.body);
    let _id = req.body;
    console.log(_id)
    User.findOneAndUpdate({ _id }, { $set: { isActivated } }).then((res) => {
        console.log("ok")
    })
})

app.post("/desactivate", (req, res) => {
    let idUser = jwt.verify(req.headers['authorization'], "hazem").idUser;
    let isActivated = false;
    console.log(req.body);
    let _id = req.body._id;
    User.findOneAndUpdate({ _id }, { $set: { isActivated } }).then((res) => {
        console.log("ok")
    })
});


async function getInformation() {
    let info = [];
    users = 0;
    onlineusers = 0;
    admins = 0;
    prenom = "";
    nom = "";
    let data = [];
    await User.find({}).then((r) => {
        users = r.length;
    })
    await User.find({}).where("status").equals(true).then((r) => {
        onlineusers = r.length;
    });
    await User.find({}).where("role").equals("admin").then((r) => {
        admins = r.length;
    })
    await User.find({}).then((r) => {
        data.push(r);
    })
    return { users: users, OnlineUsers: onlineusers, Admins: admins, data: data };
}




module.exports = app;
