const path = require('path');
const express = require('express');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const {
  PORT = 3000,
} = process.env;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', usersRouter);
app.use('/', cardsRouter);

app.use((req, res) => res.status(404).send({
  message: 'Запрашиваемый ресурс не найден',
}));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listen on port ${PORT}`);
});