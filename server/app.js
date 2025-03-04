const express = require('express');
const cors = require('cors');
// const rootRouter = require('./routers');
const { basicErrorMW } = require('./middlewares/errors/basicErrorMW');
const { PUBLIC_FOLDER_PATH } = require('./constants');

const app = express();

app.use(cors());

app.use(express.static(PUBLIC_FOLDER_PATH));

app.use(express.json());

// app.use(rootRouter);

app.get('/test', (req, res) => {
  res.send('You are visiting container');
});

app.use(basicErrorMW);

module.exports = app;
