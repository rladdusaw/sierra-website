var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var pgp = require('pg-promise')(/*options*/);
var db = pgp(config.connectionString);

var service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function authenticate(username, password) {
  var deferred = Q.defer();

  db.oneOrNone('SELECT * FROM users WHERE username = $1', username)
    .then(function(user) {
      if (user !== null) {
        deferred.resolve({
          _id: user.id,
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name,
          admin: user.admin,
          token: jwt.sign({sub: user.id }, config.secret)
        });
      } else {
        deferred.reject();
      }
    })
    .catch(function(err) {
      deferred.reject(err.name + ': ' + err.message);
    });
  
  return deferred.promise;
}

function getAll() {
  var deferred = Q.defer();

  db.manyOrNone('SELECT * FROM users')
    .then(function(users) {
      users = _.map(users, function(user) {
        deferred.resolve(_.omit(user, 'password_hash'));
      });
    })
    .catch(function(err) {
      deferred.reject(err.name + ': ' + err.message);
    });

    return deffered.promise;
}

function getById(id) {
  var deferred = Q.defer();

  db.oneOrNone('SELECT * FROM users where id = $1', id)
    .then(function(user) {
      deferred.resolve(_.omit(user, 'password_hash'));
    })
    .catch(function(err) {
      deferred.reject(err.name + ': ' + err.message);
    });
    console.log("returning: ", deferred.promise)
    return deferred.promise;
}

function create(userParams) {
  var deferred = Q.defer();

  db.oneOrNone('SELECT * FROM users WHERE username = $1', userParams.username)
    .then(function(user) {
      if (user) {
        deferred.reject('Username "' + userParams.username + '" is already taken');
      } else {
        createUser();
      }
    })
    .catch(function(err) {
      deferred.reject(err.name + ': ' + err.message);
    });

    function createUser() {
      var user = _.omit(userParams, 'password');
      user.password_hash = bcrypt.hashSync(userParams.password, 10);

      db.none('INSERT INTO users (username, password_hash, first_name, last_name) VALUES (${username}, ${password_hash}, ${first_name}, ${last_name});', {
        username: user.username,
        password_hash: user.password_hash,
        first_name: user.first_name,
        last_name: user.last_name
      })
      .then(function() {
        defered.resolve();
      })
      .catch(function(err) {
        deferred.reject(err.name + ': ' + err.message);
      });
    }
    return deferred.promise;
}

function update() {

}

function _delete() {

}