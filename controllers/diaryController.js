const Diary = require('../models/Diary')
const fs = require('fs')

exports.getAllDiaries = async (req, res) => {
  const page = req.query.page || 1
  const diariesPerPage = 3
  const totalDiaries = await Diary.find().countDocuments()
  const diaries = await Diary.find({})
    .sort('-createdAt')
    .skip((page - 1) * diariesPerPage)
    .limit(diariesPerPage)
  res.render('index', {
    diaries,
    current: page,
    pages: Math.ceil(totalDiaries / diariesPerPage)
  })
}

exports.getDiary = async (req, res) => {
  const diary = await Diary.findById(req.params.id)
  res.render('diary', {
    diary
  })
}

exports.createDiary = async (req, res) => {
  const uploadDir = 'public/uploads'

  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir)

  let uploadedImage = req.files.image
  let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name

  uploadedImage.mv(uploadPath, async () => {
    await Diary.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name
    })
    res.redirect('/')
  })
}

exports.updateDiary = async (req, res) => {
  const diary = await Diary.findOne({_id: req.params.id})
  diary.title = req.body.title
  diary.description = req.body.description
  diary.save()

  res.redirect(`/diaries/${req.params.id}`)
}

exports.deleteDiary = async (req, res) => {
  const diary = await Diary.findOne({_id: req.params.id})
  let deletedImage = __dirname + '/../public' + diary.image
  fs.unlinkSync(deletedImage)

  await Diary.findByIdAndRemove(req.params.id)
  
  res.redirect('/')
}