var express = require('express');
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});


var users = require('../models/users');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  }
  else {
    res.redirect('/login');
  }
}


router.get('/', isLoggedIn, function(req, res, next) {

  users.find(function(err, users) {
    if (err) {
      console.log(err);
      res.render('error');
    }
    else {

      res.render('users', {
        title: 'User listing',
        users: users,
        users: req.users
      });
    }
  });
});


router.get('/add', isLoggedIn, function(req, res, next) {
  res.render('add-user', {
    title: 'Add a user',
    users: req.users
  } );
});


router.post('/add', isLoggedIn, function(req, res, next) {

  users.create( {
    username: req.body.username,
    password: req.body.password,
  }, function(err, users) {
    if (err) {
      console.log(err);
      res.render('error', { message: 'Cannot add a user'} );
    }
    else {
      res.redirect('/users');
    }
  });
});

router.get('/delete/:_id', isLoggedIn, function(req, res, next) {

  var _id = req.params._id;

 users.remove( { _id: _id }, function(err) {
    if (err) {
      console.log(err);
      res.render('error', {
        message: 'Could not Delete user',
        error: err
      });
    }
    else {
      res.redirect('/users');
    }
  });
});


router.get('/:_id', isLoggedIn, function(req, res, next) {
  var _id = req.params._id;

  users.findById( { _id: _id }, function(err, users) {
    if (err) {
      console.log(err);
      res.render('error', {
        message: 'User not found',
        error: err
      });
    }
    else {
      res.render('edit-user', {
        title: 'Edit User',
        users: users,
        users: req.users
      });
    }
  });
});


router.post('/:_id', isLoggedIn, function(req, res, next) {
  var _id = req.params._id;


  var users = new users({
    _id: _id,
    username: req.body.username,
    password: req.body.password,
  });


  users.update({ _id: _id }, users, function(err) {
    if (err) {
      console.log(err);
      res.render('error', {
        message: 'Could not Update user',
        error: err
      });
    }
    else {
      res.redirect('/users');
    }
  });
});

module.exports = router;





//THis was going to be used to generate a hash for the password. I did not get this project working but its here

var userSchema = mongoose.Schema({

      local: {
        email: String,
        password: String,
      }
    }
  );


userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);



module.exports = router;



