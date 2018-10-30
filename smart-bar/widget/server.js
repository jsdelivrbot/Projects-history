var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(express.static(__dirname));
app.use(cors());
app.use(bodyParser());

app.get('/smartbar', getWidget);
app.post('/experiment/create', expCreate);
app.post('/experiment/getAll', expGetAll);

var api = {
  create: 'https://8h9apiux6d.execute-api.us-west-2.amazonaws.com/dev/experiment/create',
  fetch: 'https://8h9apiux6d.execute-api.us-west-2.amazonaws.com/dev/experiment/getAll',
};

app.listen(3000, function() {
  console.log('Server started at: localhost:3000');
});

function getWidget(req, res) {
  res.sendFile(__dirname + '/smartbar.js');
}

function expCreate(req, res) {
  apiRequest(api.create, req, res);
}

function expGetAll(req, res) {
  apiRequest(api.fetch, req, res);
}

function apiRequest(url, req, res) {
  var options = {
    url: url,
    method: 'post',
    json: true,
    body: req.body,
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      res.status(500);
      res.send(JSON.stringify({ error: error }));
    }
  });
}
