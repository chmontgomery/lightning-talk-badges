var express = require('express');
var router = express.Router();
var viewModel = require('../lib/view-model');
var spreadsheetService = require('../lib/services/spreadsheet-service');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res) {

  viewModel().then(function (data) {
    //console.log(data);
    res.render('index', data);
  });

});

router.get('/people', function (req, res) {
  spreadsheetService("People")
    .then(function (data) {
      res.json(data);
    });
});

router.get('/badges', function (req, res) {
  spreadsheetService("Badges")
    .then(function (data) {
      res.json(data);
    });
});

