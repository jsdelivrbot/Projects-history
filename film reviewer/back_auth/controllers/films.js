var fs = require('fs');
const film = require('../models/film');

//  GET ONE FILM
exports.getFilms = function (req, res) {
  film.find({}, function (err, films) {
    if (err) return err;
    res.send(films);
  });
};

//  GET ONE FILM
exports.getFilm = function (req, res) {
  var id = req.params.id;

  film.findById(id, function (err, film) {
    if (err) return err;
    res.send(film);
  });
};

// // DELETE FILM
exports.deleteFilm = function (req, res) {
  var id = req.params.id;
  var oldPath = '../client_auth/' + req.headers.body;

  fs.unlink(oldPath);

  film.findById(id, function (err, film) {
    if (film !== null)
      film.remove(function (err) {
      });
    res.send(film);
  });
};

