const Card = require('../models/card');
const CardOwnerError = require('../errors/CardOwnerError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(201).send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => new NotFoundError('Такой карточки не существует'))
    .then((card) => {
      if (JSON.stringify(card.owner._id) !== JSON.stringify(req.user._id)) {
        return next(new CardOwnerError('Нельзя удалить чужую карточку'));
      }
      return card.remove()
        .then(() => res.send({ message: 'Объект удален' }));
    })
    .catch(next);
};

module.exports.setCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    { _id: req.params.cardId },
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .orFail()
    .then((card) => res.status(201).send(card))
    .catch(next);
};

module.exports.deleteCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    { _id: req.params.cardId },
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .orFail()
    .then((card) => res.send(card))
    .catch(next);
};
