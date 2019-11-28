const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { checkErrorStatus, checkErrorMessage } = require('../modules/checkError');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => new Error('404|Нет пользователя с таким id'))
    .then((user) => res.send(user))
    .catch((err) => res.status(checkErrorStatus(err)).send({ message: checkErrorMessage(err) }));
};

const createUser = (req, res) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => res.status(201).send({
      _id: user._id, email: user.email, name: user.name, about: user.about, avatar: user.avatar,
    }))
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

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильная почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильная почта или пароль'));
          }
          const token = jwt.sign({ _id: user._id }, 'Ahgj8RT3OLaB9Nbv8s4dT7tIO', { expiresIn: '7d' });
          return res.cookie('jwt', token, {
            maxAge: 25200000,
            httpOnly: true,
            sameSite: true,
          }).end();
        });
    })
    .catch((err) => res.status(401).send({ message: err.message }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
};
