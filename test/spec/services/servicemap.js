'use strict';

describe('Service: serviceMap', function () {

  // load the service's module
  beforeEach(module('exerciceApp'));

  // instantiate service
  var serviceMap;
  beforeEach(inject(function (_serviceMap_) {
    serviceMap = _serviceMap_;
  }));

  it('should do something', function () {
    expect(!!serviceMap).toBe(true);
  });

});
