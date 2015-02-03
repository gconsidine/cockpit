var ApiRoutes = function (app, express, plz) {
  'use strict';

  var router = express.Router();
  var crypto = require('crypto');

  router.post('/cockpit-api/user', function (req, res) {
    var user = req.body.user;

    user.createdAt = Date.now();
    user.status = 'unactivated';
    
    plz.create.user(user, function (error, result) {
      if(error) {
        res.status(500).send(result);
        return;
      }
      
      var hash = crypto.createHash('sha256').update('fake').digest('hex');

      var options = {
        user: user,
        subject: 'Activation Link',
        body: '<b>Activation Hash: </b>' + hash,
        hash: hash
      };
      
      plz.send.activation(options, function (error, result) {
        if(error) { 
          res.status(500).send(result);
          return;
        }

        res.status(200).send(result);
      });
    });
  });

  router.post('/cockpit-api/login', function (req, res) {
    console.log(req, res);
  });

  app.use('/', router);
};

module.exports = ApiRoutes;
