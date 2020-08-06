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
    title, content, publishedAt, source, url, urlToImage,
  } = req.body;
  Article.create({
    // TODO hardcode
    keyword: 'test',
    title,
    image: urlToImage,
    text: content,
    date: publishedAt,
    source,
    link: url,
    owner: req.user._id,
  })
    .then((article) => res.send({ article }))
    .catch((err) => next(err));
};

const delArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (article == null) {
      throw new NotFoundError('Статья не найдена');
    // eslint-disable-next-line eqeqeq
    } else if (req.user._id == article.owner) {
    // TODO вообще нужна ли эта проверка, если статьи будут отображаться в лк данного пользователя
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
