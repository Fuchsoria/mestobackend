const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ card }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Card.findOne({ _id: cardId })
    .orFail(() => {
      throw new NotFoundError('Карточка не существует');
    })
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (_id === String(card.owner)) {
        Card.findByIdAndDelete(cardId)
          .then((result) => res.send(result))
          .catch(next);
      } else {
        throw new ForbiddenError('Вы можете удалять только свои карточки');
      }
    })
    .catch(next);
};

const setLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка не существует');
    })
    .then((card) => res.send(card))
    .catch(next);
};

const removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setLike,
  removeLike,
};
