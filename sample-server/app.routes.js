var AppRoutes = function (app, express, plz) {
  'use strict';

  var router = express.Router();

  router.get('/', function (req, res) {
    res.render('index');
  });

  router.get('/cockpit', function (req, res) {
    res.render('cockpit');
  });

  app.use('/', router);
};

module.exports = AppRoutes;
