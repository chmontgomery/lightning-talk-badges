var express = require('express');
var router = express.Router();
var viewModel = require('../lib/view-model');
var spreadsheetService = require('../lib/services/spreadsheet-service');
var log = require('../lib/services/logger-service');
var properties = require('../lib/services/property-service').getProperties();

module.exports = function (app) {
  app.use('/data', router);
};

router.get('/', function (req, res) {
  viewModel()
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      log.error(err);
      res.send(500);
    });
});

router.get('/people', function (req, res) {
  spreadsheetService("People")
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      log.error(err);
      res.send(500);
    });
});

router.get('/achievements', function (req, res) {
  spreadsheetService("Achievements")
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      log.error(err);
      res.send(500);
    });
});

