'use strict';

/**
 * @ngdoc function
 * @name exerciceApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the exerciceApp
 */
angular.module('exerciceApp')
.controller('AddrunnerCtrl', function ($scope, serviceAjax) {
  //permet d'afficher les données des courreurs proches
    var loadCoureurs = function (){
      serviceAjax.courreurs()
      .then(function(data){
        $scope.users = data.data;
        console.log(data);
      })
      .catch(function(response){
        console.log(response);
      });
    };


    $scope.addRunner = function(newRunner){
      serviceAjax.insertRunner(newRunner)
      .then(function(){
        //ajoute le nouvel utilisateur à la scope sans devoir recharger la page en appelant le serveur
        $scope.users.push({
          email: $scope.newRunner.email,
          locations:{
            label: $scope.newRunner.locations.label,
            lat: $scope.newRunner.locations.lat,
            lng: $scope.newRunner.locations.lng
          }
        });
        $scope.result='Nouveau coureur ajouté';
        //Vide les champs du formulaire
        $scope.newRunner.email='';
        $scope.newRunner.locations.label='';
        $scope.newRunner.locations.lat='';
        $scope.newRunner.locations.lng='';
      })
      .catch(function(response){
        console.log("quelque chose ne vas pas bien : response", response);
        $scope.result='Oops, le coureur n\'a pas pu être ajouté';
      });

    };

    loadCoureurs();
});
