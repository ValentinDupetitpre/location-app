'use strict';

/**
 * @ngdoc overview
 * @name exerciceApp
 * @description
 * # exerciceApp
 *
 * Main module of the application.
 */
angular
  .module('exerciceApp', [
    'ngRoute', 'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/addRunner', {
        templateUrl: '/views/addrunner.html',
        controller: 'AddrunnerCtrl'
      })
      .when('/findRunner', {
        templateUrl: 'views/findrunner.html',
        controller: 'FindrunnerCtrl'
      })
      .otherwise({
        redirectTo: '/addRunner'
      });
  });
