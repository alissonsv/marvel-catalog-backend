const express = require('express');
const { createUrl, fetchMarvelAPI } = require('../utils/marvelAPI');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/:id', auth, async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isNaN(id)) {
    const urlString = `https://gateway.marvel.com:443/v1/public/comics/${id}`;
    const url = createUrl(urlString);

    try {
      const comics = await fetchMarvelAPI(url);
      res.send(comics);
    } catch (e) {
      res.status(500).send();
    }
  } else {
    res.status(500).send({ error: 'Please provide an id!' });
  }
});

router.get('/:id/characters', auth, async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isNaN(id)) {
    const urlString = `https://gateway.marvel.com:443/v1/public/comics/${id}/characters`;
    const url = createUrl(urlString);

    const params = Object.keys(req.query);
    params.forEach((param) => {
      if (req.query[param] !== '') {
        url.searchParams.set(param, req.query[param]);
      }
    });

    try {
      const comics = await fetchMarvelAPI(url);
      res.send(comics);
    } catch (e) {
      res.status(500).send();
    }
  } else {
    res.status(500).send({ error: 'Please provide an id!' });
  }
});

router.get('/', auth, async (req, res) => {
  const urlString = 'https://gateway.marvel.com:443/v1/public/comics';
  const url = createUrl(urlString);

  const params = Object.keys(req.query);
  params.forEach((param) => {
    if (req.query[param] !== '') {
      url.searchParams.set(param, req.query[param]);
    }
  });

  try {
    const comics = await fetchMarvelAPI(url);
    res.send(comics);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
