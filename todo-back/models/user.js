var mongoose = require('mongoose');
const validator = require('validator');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    nom: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    prenom: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        validate: {
            validator: validator.isEmail,
            message: "Email invalide"
        },
        unique: true
    },
    password: String,
    telephone: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    role: {
        type: String,
        default: "user"
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: false
    },
    dateConnexion : {
        type : Date,
        default: null
    },
    dateDeconexion : {
        type : Date,
        default: null
    }
});

module.exports = mongoose.model('user', blogSchema);
