const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  keyword: {
    required: true,
    type: mongoose.Schema.Types.String,
  },
  title: {
    required: true,
    type: mongoose.Schema.Types.String,
  },
  text: {
    required: true,
    type: mongoose.Schema.Types.String,
  },
  date: {
    required: true,
    type: mongoose.Schema.Types.Date,
  },
  source: {
    required: true,
    type: mongoose.Schema.Types.String,
  },
  link: {
    required: true,
    type: mongoose.Schema.Types.String,
    validate: {
      validator(v) {
      // eslint-disable-next-line
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(v);
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
  },
  image: {
    required: true,
    type: mongoose.Schema.Types.String,
    validate: {
      validator(v) {
      // eslint-disable-next-line
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(v);
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    select: false,
  },

});

module.exports = mongoose.model('article', articleSchema);
