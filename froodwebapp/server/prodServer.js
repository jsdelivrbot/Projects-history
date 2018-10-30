/* eslint-disable */
const path = require('path');
const express = require('express');
const app = express();

const ROOT_PATH = path.resolve(process.cwd());

app.get(['*.js'], (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use('/assets', express.static(`${ROOT_PATH}/dist/gzip`));

app.get('/favicon.ico', (req, res) => {
  res.sendFile(`${__dirname}/static/favicon.ico`);
});

app.get('/*', (req, res) => {
  res.sendFile(`${ROOT_PATH}/dist/gzip/indexProd.html`);
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
