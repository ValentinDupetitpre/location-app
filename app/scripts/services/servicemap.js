'use strict';

/**
 * @ngdoc service
 * @name exerciceApp.serviceMap
 * @description
 * # serviceMap
 * Service in the exerciceApp.
 */
angular.module('exerciceApp')
  .service('serviceMap', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.initMap = function() {
      var options= {
        center: new google.maps.LatLng(48.856614, 2.3522219000000177),
        zoom: 10
      };
    this.map = new google.maps.Map(document.getElementById("map"), options);
  };


  // Adds a marker to the map and push to the array.
  this.addMarker = function(markers, res) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(res.lat, res.lng),
      map: this.map,
      animation: google.maps.Animation.DROP
    });
    markers.push(marker);
  };


  // Deletes all markers in the array by removing references to them.
  this.deleteMarkers = function(markers) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  };


  this.centerMap = function (location) {
    this.map.setCenter(new google.maps.LatLng(location.lat, location.lng));
    if(this.marker){
      this.marker.setMap(null);
    }
  };

});
