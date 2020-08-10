const router = require('express').Router();
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const auth = require('../middlewares/auth');
const { getArticles, delArticle, createArtile } = require('../controller/articles');

router.use(bodyParser.json());

router.get('/articles', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
}), auth, getArticles);

router.delete('/articles/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
  query: Joi.object().keys({
  }),
}), auth, delArticle);

router.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.date().required(),
    source: Joi.string().required(),
    link: Joi.string().required().min(2).custom((value) => {
      if (!validator.isURL(value)) {
        throw new Error('incorrect URL');
      }
      return value;
    }),
    image: Joi.string().required().min(2).custom((value) => {
      if (!validator.isURL(value)) {
        throw new Error('incorrect URL');
      }
      return value;
    }),
  }).unknown(),
}), auth, createArtile);

module.exports = router;
