require('rootpath')();
const compression = require('compression');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const config = require('config.json');
const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'dev';

// Gzip
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/users/*', expressJwt({
  secret: config.secret,
  getToken: function(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
}));

// Run the app by serving the static files in the dist directory
app.use(express.static(__dirname + '/dist'));

// Start the app by listening on the default Heroku port
app.listen(port);

app.use('/users', require('./controllers/users.controller'));

// For all GET requests, send back index.html so that PathLocationStrategy can be used
var index_path = '/client/src/index.html';
if (env === 'production') {
  index_path = '/client/dist/index.html';
}
app.get('/*', function(req, res) {
  var projectRoot = path.join(__dirname, '../');
  res.sendFile(path.join(projectRoot + index_path));
})

console.log(`Server listening on ${port}`);