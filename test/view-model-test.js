var should = require('should');
var viewModel = require('../src/lib/view-model');

describe('view-model', function () {

  it('should ', function (done) {

    viewModel().then(function (data) {

      should(data).be.ok;
      should(data.people).be.ok;
      should(data.badges).be.ok;
      should.deepEqual(data.badges[0],
        {
          'id': 'beginner',
          'type': 'bronze',
          'name': 'Beginner',
          'description': 'give 1 lightning talk'
        });
      data.badges.length.should.equal(14);

      done();

    }).catch(done);

  });

});
