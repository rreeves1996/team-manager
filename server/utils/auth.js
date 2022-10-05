const jwt = require('jsonwebtoken');

const secret = 'the_most_secret_of_all';
const expiration = '2h';

const auth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

const signToken = ({ email, username, id }) => {
  const payload = { email, username, id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = { auth, signToken };
