const { HTTP_STATUS_CREATED, HTTP_STATUS_OK } = require('http2').constants;
const mongoose = require('mongoose');
const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.addCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      // Card.findById(card._id)
      //   .orFail()
      //   .populate('owner')
      //   .then((data) => res.status(HTTP_STATUS_CREATED).send(data))
      //   .catch((error) => {
      //     if (error instanceof mongoose.Error.DocumentNotFoundError) {
      //       next(new NotFoundError('Запрашиваемая карточка не найдена'));
      //     } else {
      //       next(error);
      //     }
      //   });
      res.status(HTTP_STATUS_CREATED).send(card);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(error.message));
      } else {
        next(error);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    // .populate(['owner', 'likes'])
    .then((cards) => res.status(HTTP_STATUS_OK).send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      } else if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Невозможно удалить карточку другого пользователя');
      } else {
        Card.deleteOne(card)
          .orFail()
          .then(() => {
            res.status(HTTP_STATUS_OK).send({ message: 'Карточка удалена' });
          })
          .catch((error) => {
            if (error instanceof mongoose.Error.DocumentNotFoundError) {
              next(new NotFoundError('Запрашиваемая карточка не найдена'));
            } else {
              next(error);
            }
          });
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Некорректные данные карточки'));
      } else {
        next(error);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    // .populate(['owner', 'likes'])
    .then((card) => {
      res.status(HTTP_STATUS_OK).send(card);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Запрашиваемая карточка не найдена'));
      } else if (error instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Некорректные данные карточки'));
      } else {
        next(error);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    // .populate(['owner', 'likes'])
    .then((card) => {
      res.status(HTTP_STATUS_OK).send(card);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Запрашиваемая карточка не найдена'));
      } else if (error instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Некорректные данные карточки'));
      } else {
        next(error);
      }
    });
};
