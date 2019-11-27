const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const deleteCard = (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Card.findOne({ _id: cardId })
    .orFail(() => ({ message: 'Нет карточки с таким id', status: 404 }))
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (_id === String(card.owner)) {
        Card.findByIdAndDelete(cardId)
          .then((result) => res.send(result))
          .catch((err) => res.status(err.status || 500).send({ message: `${err.message || err}` }));
      } else {
        return Promise.reject(new Error('Вы можете удалять только свои карточки'));
      }
    })
    .catch((err) => res.status(err.status || 500).send({ message: err.message }));
};

const setLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setLike,
  removeLike,
};
