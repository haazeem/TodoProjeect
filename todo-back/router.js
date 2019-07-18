const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var mongoose = require('mongoose');

const user = require('./controllers/userController');
const todo = require('./controllers/todoController');
const superadmin = require('./controllers/superAdminController')
const Admin = require('./controllers/adminController');


var app = express();
var port = "3000";

app.use(bodyParser.json());
app.use(cors());

app.use("/user", user);
app.use("/todo", todo);
app.use("/superadmin", superadmin);
app.use("/admin", Admin);

app.get("/", (req, res) => {
    res.send({
        message: "<h1>Welcome to the Server </h1>"
    });
});

app.listen(port, () => {
    console.log("server started on port 3000");
});

