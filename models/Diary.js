const mongoose = require('mongoose');
const {Schema} = mongoose;

const DiarySchema = new Schema({
  title: String,
  description: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Diary = mongoose.model('Diary', DiarySchema)

module.exports = Diary