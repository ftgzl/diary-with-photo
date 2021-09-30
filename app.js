const express = require('express');
const ejs = require('ejs');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
const app = express();
const photoController = require('./controllers/photoController')
const pageController = require('./controllers/pageController')

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

// ROUTES
app.get('/', photoController.getAllPhotos)
app.get('/photos/:id', photoController.getPhoto)
app.post('/photos', photoController.createPhoto)
app.put('/photos/:id', photoController.updatePhoto)
app.delete('/photos/:id', photoController.deletePhoto)

app.get('/add', pageController.getAddPage)
app.get('/photos/edit/:id', pageController.getEditPage)


app.listen(PORT, (req, res) => {
  console.log(`Listening port ${PORT}...`);
})
