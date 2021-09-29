const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const Photo = require('./models/photo');
const app = express();

mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const PORT = 3000;

// TEMPLATE ENGINE
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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
  const photos = await Photo.find({})
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
  //console.log(req.body);
  await Photo.create(req.body)
  res.redirect('/')
})


app.listen(PORT, (req, res) => {
  console.log(`Listening port ${PORT}...`);
})
