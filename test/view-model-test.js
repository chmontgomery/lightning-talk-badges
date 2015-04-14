var should = require('should');
var _ = require('lodash');
var viewModel = require('../src/lib/view-model');

describe('view-model', function () {

  it('should create proper badge object', function (done) {

    viewModel().then(function (data) {

      should(data).be.ok;
      should(data.badges).be.ok;
      should(data.badges.beginner).be.ok;
      should.deepEqual(data.badges.beginner,
        {
          'type': 'bronze',
          'name': 'Beginner',
          'description': 'give 1 lightning talk'
        });

      should(data.badges['no-slides']).be.ok;
      should.deepEqual(data.badges['no-slides'],
        {
          'type': 'bronze',
          'name': 'Look Ma, No Slides!',
          'description': 'talk does not include any powerpoint (or equivalent) slides'
        });

      done();

    }).catch(done);

  });

  it('should create proper people object', function (done) {

    viewModel().then(function (data) {

      should(data).be.ok;
      should(data.people).be.ok;
      should.deepEqual(_.find(data.people, function(person) {
          return person.name === 'Jesse Gavin';
        }),
        {
          badges: {
            beginner: 1,
            experienced: 1,
            'no-slides': 2,
            prepared: 1,
            teamwork: 1
          },
          name: 'Jesse Gavin',
          points: 9
        });
      should.deepEqual(_.find(data.people, function(person) {
          return person.name === 'Chris Montgomery';
        }),
        {
          'name': 'Chris Montgomery',
          'badges': {
            'beginner': 1,
            'no-slides': 1,
            'prepared': 1,
            'contributor': 1
          },
          points: 6
        });

      data.people.length.should.equal(43);

      done();

    }).catch(done);

  });

});
