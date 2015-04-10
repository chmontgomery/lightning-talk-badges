/*global angular */
(function () {
  'use strict';

  var module = angular.module('LightningBadges.controllers', []);

  module.controller('HomeController', ['$scope', function ($scope) {
    $scope.people = JSON.parse($scope.peopleString);
    $scope.badges = JSON.parse($scope.badgesString);
    $scope.peopleOrderer = function (person) {
      return _.reduce(person.badges, function(result, n, key) {
        result += n;
        return result;
      }, 0);
    };
  }]);

  module.controller('PersonBadgesController', ['$scope', function ($scope) {
  }]);

  module.controller('BadgesController', ['$scope', function ($scope) {
    $scope.getName = function () {
      return $scope.badgeTypes[$scope.badgeId].name;
    };
    $scope.getTitle = function () {
      return $scope.badgeTypes[$scope.badgeId].description;
    };
    $scope.getTypeColor = function () {
      switch ($scope.badgeTypes[$scope.badgeId].type) {
        case 'gold':
          return '#FFD700';
        case 'silver':
          return 'silver';
        default:
          return '#CD7F32';
      }
    };
  }]);

})();


