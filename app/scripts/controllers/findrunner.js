'use strict';

/**
 * @ngdoc function
 * @name exerciceApp.controller:FindrunnerCtrl
 * @description
 * # FindrunnerCtrl
 * Controller of the exerciceApp
 */
angular.module('exerciceApp')
  .controller('FindrunnerCtrl', function ($scope, serviceAjax) {

    var loadProches = function (input){
      serviceAjax.proches(input)
      .then(function(data){
        $scope.coureurs = data.data;
        console.log('recup de findRunner : ',data);
        $scope.result='requète envoyée';
      })
      .catch(function(response){
        console.log(response);
        $scope.result='Un problème est apparu';
      });
    };

    $scope.findRunners = function(central){
      loadProches(central);
    };


  });
