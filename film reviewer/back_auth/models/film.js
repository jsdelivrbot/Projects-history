const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const filmSchema = new Schema({
  title: String,
  categories: String,
  content: String,
  image: String
});

// Create the model class
const ModelClass = mongoose.model('film', filmSchema);

//Export the model
module.exports = ModelClass;