var fs = require('fs');
const Authentication = require('./controllers/authentication');
const Film = require('./controllers/films');
const passportService = require('./services/passport');
const passport = require('passport');

var multer = require('multer');
var FilmModel = require('./models/film');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function (app) {

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client_auth/src/images/uploaded')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });

  var upload = multer({
    storage: storage
  });

  app.get('/', requireAuth, function (req, res) {
    res.send({message: 'Super secret code is \'Jack Sparrow\''});
  });

  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);

  app.get('/films', requireAuth, Film.getFilms);
  app.get('/films/:id', requireAuth, Film.getFilm);
  app.delete('/films/:id', requireAuth, Film.deleteFilm);
  // app.put('/films/update/:id', requireAuth, Film.updateFilm);

  app.put('/films/update/:id', requireAuth, upload.any(), function (req, res) {

    var image = '/src/images/uploaded/' + req.files[0].originalname;
    var _id = req.body._id;
    var userParam = req.body;
    var oldPath = '../client_auth/' + req.body.oldImage;
    fs.unlink(oldPath);

    // fields to update
    var set = {
      title: userParam.title,
      categories: userParam.categories,
      content: userParam.content,
      image: image
    };
    FilmModel.findById(_id, function (err, film) {
      // Handle any possible database errors
      if (err) {
        res.status(500).send(err);
      } else {

        film.title = set.title || film.title;
        film.categories = set.categories || film.categories;
        film.content = set.content || film.content;
        film.image = set.image || film.image;

        // Save the updated document back to the database
        film.save(function (err, film) {
          if (err) {
            res.status(500).send(err)
          }
          res.send(film);
        });
      }
    });
  });

  app.post('/films/add', requireAuth, upload.any(), function (req, res) {
    var image = '/src/images/uploaded/' + req.files[0].originalname;
    var film = {};
    film['image'] = image;
    film['title'] = req.body.title;
    film['categories'] = req.body.categories;
    film['content'] = req.body.content;
    var newFilm = new FilmModel(film);

    newFilm.save(function (err, film) {
      if (err) {
        res.send(err);
      }
      res.send(film);
    });
  });

};
