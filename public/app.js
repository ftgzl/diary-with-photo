const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.static('public'))

app.get('/', (req, res) => {
  // const exampleData = {
  //   id: 1,
  //   name: 'Name',
  //   description: 'Description',
  // };
  // res.send(exampleData);

  res.sendFile(path.resolve(__dirname, 'index.html'))

});

app.listen(PORT, (req, res) => {
  console.log(`Listening port ${PORT}...`);
})
