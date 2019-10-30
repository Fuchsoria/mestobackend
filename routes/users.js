const usersRouter = require('express').Router();
const users = require('../data/users');

usersRouter.get('/users/', (req, res) => {
  res.send(users);
});

usersRouter.get('/users/:id', (req, res) => {
  const {
    id
  } = req.params;
  // eslint-disable-next-line no-underscore-dangle
  const findUser = () => users.find(user => user._id === id);

  if (!findUser()) {
    res.status(404).send({
      'message': 'Нет пользователя с таким id'
    });
    return;
  }
  res.status(200).send(findUser());
});

module.exports = usersRouter;