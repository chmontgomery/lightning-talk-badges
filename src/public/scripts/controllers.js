/*global angular */
(function () {
  'use strict';

  var module = angular.module('LightningBadges.controllers', []);

  module.controller('HomeController', ['$scope', function ($scope) {
    $scope.people = JSON.parse($scope.peopleString);
    $scope.badges = JSON.parse($scope.badgesString);
  }]);

  module.controller('PersonBadgesController', ['$scope', function ($scope) {

  }]);

})();


