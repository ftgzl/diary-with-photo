
const Diary = require('../models/Diary');

exports.getAddPage = (req, res) => {
  res.render('add')
}

exports.getEditPage = async (req, res) => {
  const diary = await Diary.findOne({_id: req.params.id})
  res.render('edit', {diary})
}