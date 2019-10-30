const usersRouter = require('express').Router();
const users = require('../data/users');

usersRouter.get('/users/', (req, res) => {
  res.send(users);
});

usersRouter.get('/users/:id', (req, res) => {
  const {
    id
  } = req.params;
  if (!users.find(user => user._id === id)) {
    res.status(404).send({
      "message": "Нет пользователя с таким id"
    });
    return;
  }
  res.status(200).send(users.find(user => user._id === id));
});

module.exports = usersRouter;