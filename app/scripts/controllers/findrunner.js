'use strict';

/**
 * @ngdoc function
 * @name exerciceApp.controller:FindrunnerCtrl
 * @description
 * # FindrunnerCtrl
 * Controller of the exerciceApp
 */
angular.module('exerciceApp')
  .controller('FindrunnerCtrl', function ($scope, serviceAjax, serviceMap) {

    var markers = [];
    serviceMap.initMap();

    var loadProches = function (input){
      serviceAjax.proches(input)
      .then(function(data){
        $scope.coureurs = data.data;
        $scope.result='requète envoyée';

        for(var k=0; k < $scope.coureurs.length; k++){
          serviceMap.addMarker(markers, $scope.coureurs[k].locations);
        }
      })
      .catch(function(response){
        console.log(response);
        $scope.result='Un problème est apparu';
      });
    };

    $scope.findRunners = function(central){
      serviceMap.centerMap(central);
      serviceMap.deleteMarkers(markers);
      loadProches(central);
    };

  });
