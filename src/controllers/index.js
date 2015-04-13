var express = require('express');
var router = express.Router();
var viewModel = require('../lib/view-model');
var spreadsheetService = require('../lib/services/spreadsheet-service');
var log = require('../lib/services/logger-service');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res) {
  res.render('index', {});
});

router.get('/data', function (req, res) {
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

router.get('/badges', function (req, res) {
  spreadsheetService("Badges")
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      log.error(err);
      res.send(500);
    });
});

