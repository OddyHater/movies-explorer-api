const User = require('../models/user');

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        return;
      }
      res.status(200).send({ user });
    })
    .catch((err) => res.status(400).send('Bad request', err));

  next();
};
