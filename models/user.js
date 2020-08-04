const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    unique: true,
    type: mongoose.Schema.Types.String,
    validate: {
      validator(v) {
        // eslint-disable-next-line
          return /^(?!.*(\.\.))[a-zA-Z0-9]+[-_\.\dA-Za-z]*@[a-zA-Z\d]+[-_\da-z]*\.[a-z]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    required: true,
    type: mongoose.Schema.Types.String,
    select: false,
  },
  name: {
    required: true,
    type: mongoose.Schema.Types.String,
    minlength: 2,
    maxlength: 30,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user || !password) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
