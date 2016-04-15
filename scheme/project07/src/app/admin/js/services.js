angular.module('adminApp.services', []).factory('Ad', function($resource) {
  return $resource('/admin/api/ad', {}, {
    update: {
      method: 'PUT'
    }
  });
});