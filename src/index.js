var express = require('express');
var path = require('path');
var glob = require('glob');
//var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var cons = require('consolidate');
var errorHandler = require('./lib/error-handler');
var requestLogger = require('./lib/request-logger');
var log = require('./lib/services/logger-service');

module.exports = function () {
  var app = express();

  var template_engine = 'dust';
  app.engine(template_engine, cons.dust);
  app.set('views', __dirname + '/views');
  app.set('view engine', template_engine);

  // app.use(favicon(__dirname + '/public/images/favicon.ico'));
  if (process.env.NODE_ENV !== 'production') {
    app.use(requestLogger()); // log all requests
  } else {
    // validate ENV variables are set in prod, otherwise we won't be able to reach google spreadsheet
    if (!process.env.DRIVE_USER) {
      log.error('Missing required environment variable "env.DRIVE_USER". Will be unable to reach google spreadsheets.');
    }
    if (!process.env.PEM_KEY_FILE) {
      log.error('Missing required environment variable "env.PEM_KEY_FILE". Will be unable to reach google spreadsheets.');
    }
    if (!process.env.SPREADSHEET_ID) {
      log.error('Missing required environment variable "env.SPREADSHEET_ID". Will be unable to reach google spreadsheets.');
    }
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compression());

  // variables available on every view model
  app.set('title', 'lightning-badges');
  app.set('bundle', require(path.join(__dirname, '../bundle.result.json')));

  // make all static files available under /public route
  app.use('/public', express.static(path.join(__dirname, '../public')));

  // dynamically load all routes
  var controllersPath = path.join(__dirname, 'controllers');
  var controllers = glob.sync(controllersPath + '/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    // will print stacktrace
    app.use(errorHandler);
  } else {
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
      errorHandler({
        status: err.status,
        message: err.message
      }, req, res, next);
    });
  }

  return app;
};
