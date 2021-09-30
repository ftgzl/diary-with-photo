const express = require('express');
const path = require('path');
const ejs = require('ejs');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
const fs = require('fs');
const Photo = require('./models/photo');
const app = express();

mongoose.connect('mongodb://localhost/test', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
})

const PORT = 3000;

// TEMPLATE ENGINE
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(fileUpload())

app.use(methodOverride('_method', {
  methods:['POST', 'GET']
}))

app.get('/', async (req, res) => {
  // 1
  // const exampleData = {
  //   id: 1,
  //   name: 'Name',
  //   description: 'Description',
  // };
  // res.send(exampleData);

  // 2
  //res.sendFile(path.resolve(__dirname, 'index.html'))

  // 3
  //res.render('index')

  //4
  const photos = await Photo.find({}).sort({createdAt: -1})
  res.render('index', {
    photos
  })
});

app.get('/photos/:id', async (req, res) => {
  const photo = await Photo.findById(req.params.id)
  res.render('photo', {
    photo
  })
})

app.get('/add', (req, res) => {
  res.render('add')
})


app.post('/photos', async (req, res) => {
  // witout image
  //await Photo.create(req.body)

  const uploadDir = 'public/uploads'

  if(!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir)

  let uploadedImage = req.files.image
  let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name
    })
    res.redirect('/')
  })
})

app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findOne({_id: req.params.id})
  res.render('edit', {photo})
})

app.put('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({_id: req.params.id})
  photo.title = req.body.title
  //photo.description = req.body.Description
  photo.save()

  res.redirect(`/photos/${req.params.id}`)
})

app.delete('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({_id: req.params.id})
  let deletedImage = __dirname + '/public' + photo.image
  fs.unlinkSync(deletedImage)

  await Photo.findByIdAndRemove(req.params.id)
  
  res.redirect('/')
})


app.listen(PORT, (req, res) => {
  console.log(`Listening port ${PORT}...`);
})
