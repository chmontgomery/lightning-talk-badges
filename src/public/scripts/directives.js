/*global angular */
(function () {
  'use strict';

  var module = angular.module('LightningBadges.directives', []);

  module.directive('home', function () {
    return {
      restrict: "E",
      replace: true,
      controller: 'HomeController',
      templateUrl: '/public/partials/home.html',
      scope: {
        peopleString: "@",
        badgesString: "@"
      }
    };
  });

})();
