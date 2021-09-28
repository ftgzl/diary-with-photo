const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();
const PORT = 3000;

// TEMPLATE ENGINE
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static('public'))

app.get('/', (req, res) => {
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
  res.render('index')

});

app.get('/add', (req, res) => {
  res.render('add')
})

app.listen(PORT, (req, res) => {
  console.log(`Listening port ${PORT}...`);
})
