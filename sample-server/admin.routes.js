var AdminRoutes = function (app, express, plz) {
  'use strict';

  var router = express.Router();

  router.get('/', get);
  router.post('/', create);
  router.get('/activate', getPendingActivation);
  router.put('/activate', activate);
  router.get('/reset', getPendingReset);
  router.put('/reset', reset);
  router.put('/login', login);
  
  app.use('/cockpit-api/user', router);

  function get(req, res) {
    var options = req.query;

    plz.get.user(options, function (error, result) {
      console.log(result);
      if(error) { 
        res.status(500).send(result); 
        return; 
      } 

      res.status(200).send(result);
    });
  }

  function create(req, res) {
    var options = req.body.user;

    plz.create.user(options, function (error, result) {
      if(error) { 
        res.status(500).send(result); 
        return; 
      }

      var options = {
        user: result.data[0],
        subject: 'Activation Link'
      };

      app.render('activate-email', options, function (error, html) {
        if(error) { 
          res.status(500).send(result); 
          return; 
        }

        options.body = html;

        plz.send.activation(options, function (error, result) {
          if(error) { 
            res.status(500).send(result); 
            return; 
          }

          res.status(200).send(result);
        });
      });
    });
  }

  function getPendingActivation(req, res) {
    var options = req.query;

    plz.authorize.activation(options, function (error, result) {
      if(error) { 
        res.status(500).send(result); 
        return; 
      }

      res.status(200).send(result);
    });
  }

  function activate(req, res) {
    var options = {
      email: req.body.email,
      tempAuth: req.body.tempAuth,
      password: {
        new: req.body.password.new,
        confirm: req.body.password.confirm,
        hash: 'sha256'
      }
    };

    console.log(options);
    plz.complete.activation(options, function (error, result) {
      console.log(error, result);
      if(error) { 
        res.status(500).send(result); 
        return; 
      }

      res.status(200).send(result);
    });
  }

  function getPendingReset(req, res) {
    var options = req.query;

    plz.authorize.reset(options, function (error, result) {
      if(error) { 
        res.status(500).send(result); 
        return; 
      }

      res.status(200).send(result);
    });
  }

  function reset(req, res) {
    var options = {
      email: req.body.email,
      password: {
        new: req.body.password.new,
        confirm: req.body.password.confirm,
        hash: 'sha256'
      }
    };

    plz.complete.reset(options, function (error, result) {
      if(error) { 
        res.status(500).send(result); 
        return; 
      }

      res.status(200).send(result);
    });
  }

  function login(req, res) {
    var options = {
      email: req.body.email,
      password: {
        current: req.body.password,
        hash: 'sha256'
      }
    };

    plz.login.user(options, function (error, result) {
      console.log(options, error, result);
      if(error) { 
        res.status(500).send(result); 
        return; 
      }

      res.status(200).send(result);
    });
  }
};

module.exports = AdminRoutes;
