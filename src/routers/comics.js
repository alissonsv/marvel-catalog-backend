const express = require('express');
const md5 = require('md5');
const fetch = require('node-fetch');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const url = new URL('https://gateway.marvel.com:443/v1/public/comics');
  const ts = Date.now();
  const publicKey = process.env.MARVEL_PUBLIC_KEY;
  const privateKey = process.env.MARVEL_PRIVATE_KEY;
  const hash = md5(ts + privateKey + publicKey);

  url.searchParams.set('ts', ts);
  url.searchParams.set('apikey', publicKey);
  url.searchParams.set('hash', hash);

  const params = Object.keys(req.query);

  params.forEach((param) => url.searchParams.set(param, req.query[param]));

  try {
    const response = await fetch(url);
    const characters = await response.json();

    if (characters.code !== 200) {
      throw new Error({ error: 'Error at Marvel API' });
    }

    res.send(characters);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
