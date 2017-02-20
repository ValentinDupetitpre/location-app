'use strict';

describe('Controller: AddrunnerCtrl', function () {

  // load the controller's module
  beforeEach(module('exerciceApp'));

  var AddrunnerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddrunnerCtrl = $controller('AddrunnerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddrunnerCtrl.awesomeThings.length).toBe(3);
  });
});
