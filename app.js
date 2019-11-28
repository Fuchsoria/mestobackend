const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const routes = require('./routes');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.post('/signin', login);
app.post('/signup', createUser);
app.use('/', auth, routes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listen on port ${PORT}`);
});
