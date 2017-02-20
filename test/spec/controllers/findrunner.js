'use strict';

describe('Controller: FindrunnerCtrl', function () {

  // load the controller's module
  beforeEach(module('exerciceApp'));

  var FindrunnerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FindrunnerCtrl = $controller('FindrunnerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FindrunnerCtrl.awesomeThings.length).toBe(3);
  });
});
