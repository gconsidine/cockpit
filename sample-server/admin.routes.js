var AdminRoutes = function (app, express, plz) {
  'use strict';

  var router = express.Router();

  router.post('/', create);
  router.get('/', get);
  router.put('/', edit);
  router.delete('/', remove);
  router.get('/activate', getPendingActivation);
  router.put('/activate', activate);
  router.put('/resend-activation', resendActivation);
  router.get('/reset', getPendingReset);
  router.put('/reset', reset);
  router.put('/resend-reset', resendReset);
  router.put('/login', login);
  
  app.use('/cockpit-api/user', router);
  
  function resendActivation(req, res) {

  }

  function resendReset(req, res) {

  }

  function edit(req, res) {
    var options = req.query;

    plz.remove.user(options, function (error, result) {
      console.log(error, result);
      if(error) { 
        res.status(500).send(result); 
        return; 
      } 

      res.status(200).send(result);
    });
  }

  function remove(req, res) {
    var options = req.query;

    plz.remove.user(options, function (error, result) {
      console.log(error, result);
      if(error) { 
        res.status(500).send(result); 
        return; 
      } 

      res.status(200).send(result);
    });
  }

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
    var user = req.body.user;

    plz.create.user(user, function (error, result) {
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
    var user = req.body.user;

    var options = {
      email: user.email,
      tempAuth: user.tempAuth,
      password: {
        new: user.password.new,
        confirm: user.password.confirm,
        hash: 'sha256'
      }
    };

    plz.complete.activation(options, function (error, result) {
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
    var user = req.body.user;

    var options = {
      email: user.email,
      password: {
        new: user.password.new,
        confirm: user.password.confirm,
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
    var user = req.body.user;

    var options = {
      email: user.email,
      password: {
        current: user.password,
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
