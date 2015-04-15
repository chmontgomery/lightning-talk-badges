/*global angular, _ */
(function () {
  'use strict';

  function errorHandler(/*data, status, headers, config*/) {
    alert('ERROR: failed to load data. Try again later or bug the developer.'); // todo better messaging
  }

  var module = angular.module('LightningBadges.controllers', []);

  module.controller('HomeController', ['$scope', '$http', function ($scope, $http) {
    $scope.people = [];
    $scope.badges = {};
    $scope.peopleOrderer = function (person) {
      return _.reduce(person.badges, function(result, n/*, key*/) {
        result += n;
        return result;
      }, 0);
    };
    $http.get('/data').
      success(function(data/*, status, headers, config*/) {
        $scope.people = data.people;
        $scope.badges = data.badges;
      }).
      error(errorHandler);
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

  module.controller('HelpAchievementsController', ['$scope', '$http', function ($scope, $http) {
    $scope.people = [];
    $scope.badges = {};
    $http.get('/data').
      success(function(data/*, status, headers, config*/) {
        $scope.people = data.people;
        $scope.badges = data.badges;
      }).
      error(errorHandler);
  }]);

})();


