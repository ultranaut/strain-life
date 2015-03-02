'use strict';

/**
 * @ngdoc overview
 * @name strainLifeApp
 * @description
 * # strainLifeApp
 *
 * Main module of the application.
 */
angular
  .module('strainLifeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/calculator', {
        templateUrl: 'views/calculator.html',
        controller: 'CalculatorCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
