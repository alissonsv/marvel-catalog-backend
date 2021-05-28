const md5 = require('md5');
const fetch = require('node-fetch');

function createUrl(urlString) {
  const url = new URL(urlString);
  const ts = Date.now();
  const publicKey = process.env.MARVEL_PUBLIC_KEY;
  const privateKey = process.env.MARVEL_PRIVATE_KEY;
  const hash = md5(ts + privateKey + publicKey);

  url.searchParams.set('ts', ts);
  url.searchParams.set('apikey', publicKey);
  url.searchParams.set('hash', hash);

  return url;
}

async function fetchMarvelAPI(url) {
  const response = await fetch(url);
  const responseJSON = await response.json();

  if (responseJSON.code !== 200) {
    throw new Error({ error: 'Error at Marvel API' });
  }

  return responseJSON;
}

module.exports = {
  createUrl,
  fetchMarvelAPI,
};
