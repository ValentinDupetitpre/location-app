'use strict';

/**
 * @ngdoc function
 * @name exerciceApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the exerciceApp
 */
angular.module('exerciceApp')
  .controller('MainCtrl', function () {
    function MainCtrl($scope) {
      $scope.isCollapsed = true;
    }

  });
