const path = require('path');
require('dotenv-flow').config({ path: path.join(__dirname, './config') });

const express = require('express');
const userRouter = require('./routers/user');

const app = express();
app.use(express.json());

app.use('/api/user/', userRouter);

module.exports = app;
