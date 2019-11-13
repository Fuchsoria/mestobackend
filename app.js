// const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '5dcb4ff4b1fa3610acf4dfd1'
  };
  next();
});
app.use(usersRouter);
app.use(cardsRouter);

app.use((req, res) =>
  res.status(404).send({
    message: 'Запрашиваемый ресурс не найден'
  })
);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listen on port ${PORT}`);
});
