var express = require('express');
var router = express.Router();
var log = require('../lib/services/logger-service');
var properties = require('../lib/services/property-service').getProperties();

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res) {
  res.render('index', {
    title: properties.get('TITLE')
  });
});
