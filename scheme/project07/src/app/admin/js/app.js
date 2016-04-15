angular.module('adminApp', ['ui.router', 'ngResource', 'ngDialog', 'ngSanitize', 'adminApp.controllers', 'adminApp.services']);

angular.module('adminApp').config(function($stateProvider) {
  $stateProvider.state('ads', {
    url: 'ads',
    templateUrl: 'templates/ads.html',
    controller: 'AdsListController'
  });
}).run(function($state, $http, $window) {
  var promise = $http.get('/api/1/users/me');

  promise.then(function(response){
    var user = response.data.data;
    if (user.admin != true) {
      $window.location.href = "/";
    } else {
      $state.go('ads'); //make a transition to ads state when app starts
    }
  });
});