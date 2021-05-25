const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/', async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      try {
        user = await User.create(req.body);

        await user.generateAuthToken();
        res.status(201).send(user);
      } catch (e) {
        res.status(500).send();
      }
    } else {
      res.status(400).send({ error: 'Email already in use!' });
    }
  } else {
    res.status(400).send({ error: 'Missing parameters!' });
  }
});

module.exports = router;
