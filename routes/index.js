const router = require('express').Router();
const bodyParser = require('body-parser');
const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use(bodyParser.json());
router.use((req, res, next) => {
  req.user = {
    _id: '5dcb4ff4b1fa3610acf4dfd1',
  };
  next();
});
router.use(usersRouter);
router.use(cardsRouter);
router.use((req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));

module.exports = router;
