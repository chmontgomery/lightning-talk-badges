var spreadsheetService = require('../lib/services/spreadsheet-service');
var bluebird = require('bluebird');
var _ = require('lodash');

/* Badges
{ rows:
{ '1': { '1': 'id', '2': 'type', '3': 'name', '4': 'description' },
  '2':
  { '1': 'beginner',
    '2': 'bronze',
    '3': 'Beginner',
    '4': 'give 1 lightning talk' },
  '3':
  { '1': 'experienced',
    '2': 'silver',
    '3': 'Experienced',
    '4': 'give 3 lightning talks' },
  '4':
  { '1': 'lightning-master',
    '2': 'gold',
    '3': 'Lightning Master',
    '4': 'give 10 lightning talks' },
  '5':
  { '1': 'no-slides',
    '2': 'bronze',
    '3': 'Look Ma, No Slides!',
    '4': 'talk does not include any powerpoint (or equivalent) slides' },
  info:
  { spreadsheetId: "54321",
    worksheetId: "qwerty",
    worksheetTitle: 'Badges',
    worksheetUpdated: Wed Mar 25 2015 10:22:15 GMT-0500 (CDT),
    authors: 'christopher.montgomery',
    totalCells: 60,
    totalRows: 15,
    lastRow: 15,
    nextRow: 16 } }
*/

/* People
{ rows:
{ '1':
  { '1': 'Name',
    '2': 'Total Talks',
    '3': 'no-slides',
    '4': 'prepared',
    '5': 'interactive',
    '6': 'contributor',
    '7': 'advocate',
    '8': 'hacker',
    '9': 'luddite',
    '10': 'terminal-junkie',
    '11': 'motormouth',
    '12': 'teacher' },
  '2': { '1': 'Josh Ewer', '2': 3 },
  '3': { '1': 'Tim Schmidt', '2': 3 },
  '9': { '1': 'Chris Montgomery', '2': 2, '3': 1, '4': 1, '6': 1 },
  info:
  { spreadsheetId: "54321",
    worksheetId: "qwerty",
    worksheetTitle: 'People',
    worksheetUpdated: Wed Mar 25 2015 10:22:15 GMT-0500 (CDT),
    authors: 'christopher.montgomery',
    totalCells: 105,
    totalRows: 44,
    lastRow: 44,
    nextRow: 45 } }
*/

module.exports = function () {
  return bluebird.all([
    spreadsheetService("People"),
    spreadsheetService("Badges")
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

      delete _people.rows['1'];

      _.forEach(_people.rows, function (val, key) {
        var p = {};
        p.name = val['1'];
        var valCpy = _.defaults({}, val);
        delete valCpy['1'];
        p.badges = {};

        _.forEach(valCpy, function (v, k) {
          if (k === '2') { // special case. refers to # of talks
            if (v >= 1) {
              p.badges.beginner = 1;
            }
            if (v >= 3) {
              p.badges.experienced = 1;
            }
            if (v >= 5) {
              p.badges['lightning-master'] = 1;
            }
          } else if (peopleLegend[k]) {
            p.badges[peopleLegend[k]] = v;
          }
        });


        people.push(p);
      });

      return {
        people: people,
        badges: badges
      };

    });
};
