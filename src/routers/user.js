const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

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

router.post('/login', async (req, res) => {
  if (req.body.email && req.body.password) {
    try {
      const user = await User.findByCredentials(req.body.email, req.body.password);

      await user.generateAuthToken();
      res.send(user);
    } catch (e) {
      res.status(401).send({ error: e.message });
    }
  } else {
    res.status(400).send({ error: 'Missing parameters!' });
  }
});

router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token !== req.token);

    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
