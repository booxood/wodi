
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , routes = require('./routes')
  , log = require('./routes/log')
  , config = require('./config')
  , util = require('./util');

var app = express();

// all environments
app.set('port', process.env.PORT || config.PORT);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger({
	stream: util.accessLogFile
}));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(util.parseXmlBody);
// app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.all('/', routes.checkToken);
app.get('/', routes.get);
app.post('/', routes.post);
app.get('/log', log.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
