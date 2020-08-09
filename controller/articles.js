const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const NoRightsErr = require('../errors/no-rights-err');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((data) => res.send({ data }))
    .catch((err) => next(err));
};

const createArtile = (req, res, next) => {
  const {
    keyword, title, text, date, source, image, link,
  } = req.body;
  Article.create({
    keyword,
    title,
    image,
    text,
    date,
    source,
    link,
    owner: req.user._id,
  })
    .then((article) => res.send({ article }))
    .catch((err) => next(err));
};

const delArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id).select('+owner');
    if (article == null) {
      throw new NotFoundError('Статья не найдена');
    } else if (req.user._id == article.owner) {
      article.remove().then((deleted) => {
        res.status(200).send({ deleted });
      });
    } else {
      throw new NoRightsErr('У вас нет прав на удаление этой карточки');
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getArticles, delArticle, createArtile,
};
