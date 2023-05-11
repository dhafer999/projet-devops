const jwt = require('jsonwebtoken');
const User = require('../model/User');

const IsAuth = async (req, res, next) => {
  const token = req.headers['authorization'];
  console.log('token', token);

  if (!token) return res.status(401).send('Acces Denied ');
  try {
    const t = token.slice(7, token.length);
    console.log('tt : ', t);
    const decoded = jwt.verify(t, process.env.TOKEN_SECRET);
    const { _id } = decoded;
    console.log('decoded : ', { _id });
    //find with id
    const userToFind = await User.findOne({ _id });

    console.log('user : ', userToFind);

    if (!userToFind) {
      return res
        .status(401)
        .send({ errors: [{ msg: ' you are not authorized !!' }] });
    }

    req.user = userToFind;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};

module.exports = IsAuth;