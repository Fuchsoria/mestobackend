const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '5dcb4ff4b1fa3610acf4dfd1',
  };
  next();
});
app.use(require('./routes'));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listen on port ${PORT}`);
});
