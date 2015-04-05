(function () {
  'use strict';

  var module = angular.module('DominionTracker.controllers', []);

  module.controller('HomeController', ['$scope', function ($scope) {
    $scope.people = JSON.parse($scope.peopleString);
    $scope.badges = JSON.parse($scope.badgesString);
    console.log($scope.people)
    console.log($scope.badges)
  }]);

})();


