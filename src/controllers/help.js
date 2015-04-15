var express = require('express');
var router = express.Router();

module.exports = function(app) {
  app.use('/help', router);
};

router.get('/achievements', function(req, res) {
  res.render('helpAchievements');
});
