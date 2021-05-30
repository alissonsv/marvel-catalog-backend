const path = require('path');
require('dotenv-flow').config({ path: path.join(__dirname, '../config') });

const express = require('express');
const userRouter = require('./routers/user');
const charactersRouter = require('./routers/characters');
const comicsRouter = require('./routers/comics');

const app = express();
app.use(express.json());

app.use('/api/user/', userRouter);
app.use('/api/characters/', charactersRouter);
app.use('/api/comics/', comicsRouter);

module.exports = app;
