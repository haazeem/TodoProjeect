var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({

  titre: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10
  },
  dateAjout: {
    type: Date,
    default: new Date()
  },
  dateFin: {
    type: Date,
    default: null
  },
  etat: {
    type : Boolean,
    default : false
  },
  idUser: {
    type: String,
    required: true,
    trim: true
  },

});
module.exports = mongoose.model('Todo', blogSchema);
