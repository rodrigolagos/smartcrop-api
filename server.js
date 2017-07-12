var express = require('express'),
  app = express(),
  port = process.env.PORT || 8080,
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('welcome to the home page!');
});

app.get('*', function(req, res) {
  res.redirect('/');
});

var routes = require('./api/routes/apiRoutes');
routes(app);

app.listen(port);

console.log('Smartcrop RESTful API server started on: ' + port);
