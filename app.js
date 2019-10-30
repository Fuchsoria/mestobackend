const path = require('path');
const express = require('express');
// const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const {
  PORT = 3000
} = process.env;
const app = express();

// app.use(bodyParser.urlencoded({
//   extended: false
// }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', usersRouter);
app.use('/', cardsRouter);

app.use((req, res, next) => {
  return res.status(404).send({
    "message": "Запрашиваемый ресурс не найден"
  });
});

app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}`);
});