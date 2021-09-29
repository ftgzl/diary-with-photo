const mongoose = require('mongoose');
const {Schema} = mongoose;

const PhotoSchema = new Schema({
  title: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Photo = mongoose.model('Photo', PhotoSchema)

module.exports = Photo