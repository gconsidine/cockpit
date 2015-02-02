var AppRoutes = function (app, express, plz) {
  'use strict';

  var router = express.Router();

  router.get('/', function (req, res) {
    res.render('index');
  });

  app.use('/', router);
};

module.exports = AppRoutes;
