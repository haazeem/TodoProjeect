const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');



var app = express();

const Todo = require("./../models/todo");



app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("<h2>Welcome to user controller </h2>")

});

app.post("/todo-liste", (req, res) => {
    let idUser = jwt.verify(req.headers['authorization'], "hazem").idUser;
    Todo.find({ idUser }, (err, result) => {
        console.log()
        res.status(200).send(result);
    })
});

app.post("/todo-modif", (req, res) => {
    let data = req.body;
    let idUser = jwt.verify(req.headers['authorization'], "hazem").idUser;
    let titre = data.oldtitre;
    let description = data.olddescription;
    let dateAjout = data.data._dateAjout;  
    let Newtitle = data.data._titre;
    let Newdescription = data.data._description;
    
    Todo.findOneAndUpdate({ idUser, dateAjout, titre, description }, { $set: { titre: Newtitle, description: Newdescription } }).then((re) => {
        res.status(200).send();
    }).catch((err) => {
        
    })
    
});

app.post("/todo-supp", (req, res) => {
    let idUser = jwt.verify(req.headers['authorization'], "hazem").idUser;
    req.body._idUser = idUser;
    let dateAjout = req.body._dateAjout;
    let titre = req.body._titre;
    let description = req.body._description;
    Todo.findOneAndRemove({ idUser, dateAjout, titre, description }, (err, ress) => {
        res.status(200).send();
    });
});
app.post("/todo-ajout", (req, res) => {
    let id = jwt.verify(req.body._idUser, "hazem");
    data = new Todo({
        titre: req.body._titre,
        description: req.body._description,
        idUser: id.idUser
    });
    data.save().then(() => {
        res.status(200).send(data);
    }).catch((err) => {
        if (id == null) {
            res.status(400).send({
                mesg: "ID Erreur"
            });
        }
        res.status(400).send({
            mesg: "Erreur : " + err
        });
    });
});


app.post("/todo-termiate", (req, res) => {
    let idUser = jwt.verify(req.body._idUser, "hazem").idUser;
    req.body._idUser = idUser;
    let dateAjout = req.body._dateAjout;
    let titre = req.body._titre;
    let description = req.body._description;
    let etat = true;
    let dateFin = req.body._dateFin;
    console.log();
    Todo.findOneAndUpdate({ idUser, dateAjout, titre, description }, { $set: { etat } }).then((re) => {
        res.status(200).send();
    }).catch((err) => {
        res.send(err);
    })
    Todo.findOneAndUpdate({ idUser, dateAjout, titre, description }, { $set: { dateFin } }).then((re) => {

    }).catch((err) => {
        res.send(err);
    })
});




module.exports = app;

