const express = require('express');
const bodyParser = require('body-parser');


const bcryt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User = require('../models/user');
const Todo = require('../models/todo')


var app = express();
app.use(bodyParser.json());



app.get("/", (req, res) => {
    res.send("<h2>Welcome to user controller </h2>");
});
app.post("/register", (req, res) => {
    req.body._password = bcryt.hashSync(req.body._password, 12);
    data = new User({
        nom: req.body._nom,
        prenom: req.body._prenom,
        email: req.body._email,
        password: req.body._password,
        telephone: req.body._telephone,
        role: req.body._role
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
            User.findOneAndUpdate({ _id }, { $set: { status } }).then((res) => {

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
    let _id = req.body;
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
    await User.find({}).where("role").ne("user").then((r) => {
        users = r.length;

    })
    await User.find({ $and: [{ status: true }, { role: "user" }] }).then((r) => {
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

app.post("/userlogs", (req, res) => {
    let idUser = jwt.verify(req.headers['authorization'], "hazem").idUser;
    let data = [];
    getdata().then((rs) => {
        for (let i in rs) {
            let da = rs[i];
            for (let j in da) {
                data.push(da[j])
            }
        }
        res.status(200).send(data);
    })

})

async function getdata() {
    let data = [];
    await User.find({}).where("role").ne("super").then((r) => {
        data.push(r);

    })
    return data;

}
async function getUserByID(idUser) {
    let res = []
    await User.find({}).where("_id").equals(idUser).then((re) => {
        for (let i in re) {
            res.push(re[i].nom + " " + re[i].prenom)
        }

    })
    return res;
}

app.post("/infotodos", (req, res) => {
    let idUser = jwt.verify(req.headers['authorization'], "hazem").idUser;
    let datenow = new Date();
    let cpt = 0;
    let cpt1 = 0;

    getInfotodos(idUser).then((re) => {
        let Data = [];
        for (let i in re) {
            let da = re[i];
            for (let j in da) {
                let date = new Date(da[j].dateAjout);
                if (date.getDate() == datenow.getDate() && date.getDay() == datenow.getDay() && (date.getFullYear()) == (datenow.getFullYear())) {
                    cpt++;
                }
                if (date.getFullYear() == datenow.getFullYear() && (date.getMonth() + 1) == (datenow.getMonth() + 1)) {
                    cpt1++;
                }
                let _id = da[j].idUser;
                getUserByID(_id).then((r) => {
                    Data.push({ names: r, todos: da[j] })
                    console.log(Data)
                })
            }
        }
        res.status(200).send({ length: re.length, todaytodos: cpt, monthlytodos: cpt1, data: Data });

    })



})

async function getInfotodos(idUser) {
    let data = [];
    await Todo.find({}).where("idUser").ne(idUser).then((r) => {
        data.push(r);
    })
    return data;
}
app.post("/deconnexion", (req, res) => {
    let token = req.headers['authorization'];
    let _id = jwt.verify(token, "hazem").idUser;
    let status = false;
    User.findOneAndUpdate({ _id }, { $set: { status } }).then((res) => {
    }).catch((err) => { });
})
module.exports = app;

