const express = require('express');
const ejs = require('ejs');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const fileUpload = require('express-fileupload')
const app = express();
const diaryController = require('./controllers/diaryController')
const pageController = require('./controllers/pageController')

dotenv.config()

mongoose.connect(process.env.MONGO_URL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
})

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
app.get('/', diaryController.getAllDiaries)
app.get('/diaries/:id', diaryController.getDiary)
app.post('/diaries', diaryController.createDiary)
app.put('/diaries/:id', diaryController.updateDiary)
app.delete('/diaries/:id', diaryController.deleteDiary)

app.get('/add', pageController.getAddPage)
app.get('/diaries/edit/:id', pageController.getEditPage)


app.listen(process.env.PORT || 5000, (req, res) => {
  console.log(`Listening server...`);
})
