const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => ({ message: 'Нет пользователя с таким id', status: 404 }))
    .then((user) => res.send(user))
    .catch((err) => res.status(err.status || 500).send({ message: `${err.message || err}` }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
