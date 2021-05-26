const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.header('authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      where: {
        id: decoded.id,
        tokens: {
          [Op.contains]: [token],
        },
      },
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;

    next();
  } catch (e) {
    res.status(401).send({ error: 'Authentication error' });
  }
};

module.exports = auth;
