var spreadsheetService = require('../lib/services/spreadsheet-service');
var bluebird = require('bluebird');
var _ = require('lodash');

module.exports = function () {
  return bluebird.all([
    spreadsheetService("People"),
    spreadsheetService("Achievements")
  ])
    .spread(function (_people, _badges) {

      // --------------------
      // Badges
      // --------------------

      var badges = {};
      delete _badges.rows['1'];

      _.forEach(_badges.rows, function (val, key) {
        var id = val['1'];
        badges[id] = {};
        badges[id].type = val['2'];
        badges[id].name = val['3'];
        badges[id].description = val['4'];
      });

      // --------------------
      // People
      // --------------------

      var people = [];
      var peopleLegend = _.defaults({}, _people.rows['1']);
      delete peopleLegend['1'];
      delete peopleLegend['2'];
      delete peopleLegend['3'];

      delete _people.rows['1'];

      _.forEach(_people.rows, function (val, key) {
        var p = {};
        p.name = val['1'];
        var valCpy = _.defaults({}, val);
        delete valCpy['1'];
        delete valCpy['2'];
        p.badges = {};
        p.points = 0;

        _.forEach(valCpy, function (v, k) {
          if (k === '3') { // special case. refers to # of talks
            if (v >= 1) {
              p.badges.beginner = 1;
              p.points++;
            }
            if (v >= 3) {
              p.badges.experienced = 1;
              p.points++;
            }
            if (v >= 5) {
              p.badges['lightning-master'] = 1;
              p.points++;
            }
          } else if (peopleLegend[k]) {
            p.badges[peopleLegend[k]] = v;
          }
          p.points += v;
        });


        people.push(p);
      });

      return {
        people: people,
        badges: badges
      };

    });
};
