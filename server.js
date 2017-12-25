const compression = require('compression');
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'dev';

// Gzip
app.use(compression());

// Run the app by serving the static files in the dist directory
app.use(express.static(__dirname + '/dist'));

// Start the app by listening on the default Heroku port
app.listen(port);

// For all GET requests, send back index.html so that PathLocationStrategy can be used
var index_path = '/src/index.html';
if (env === 'production') {
  index_path = '/dist/index.html';
}
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + index_path));
});

console.log(`Server listening on ${port}`);