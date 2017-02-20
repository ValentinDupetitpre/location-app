'use strict';

/**
 * @ngdoc service
 * @name exerciceApp.serviceAjax
 * @description
 * # serviceAjax
 * Factory in the exerciceApp.
 */
angular.module('exerciceApp')
  .factory('serviceAjax', function serviceAjax($http) {
    // Public API here
    return {
      proches: function (central) {
        return $http.get('http://localhost:3000/findRunner?lat=' + central.lat + '&lng=' + central.lng);
      },

      insertRunner: function(newRunner){
        return $http.post('http://localhost:3000/index/addRunner', newRunner);
      },

      courreurs: function () {
        return $http.get('http://localhost:3000/index');
      }
    };
  });
