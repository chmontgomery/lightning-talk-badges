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

  module.directive('personBadges', function () {
    return {
      restrict: "E",
      replace: true,
      controller: 'PersonBadgesController',
      templateUrl: '/public/partials/personBadges.html',
      scope: {
        badges: "=",
        types: "="
      }
    };
  });

  module.directive('badge', function () {
    return {
      restrict: "E",
      replace: true,
      controller: 'BadgesController',
      templateUrl: '/public/partials/badge.html',
      scope: {
        badgeId: "=",
        badgeCount: "=",
        badgeTypes: "="
      }
    };
  });

})();
