/* fss angular web app */

console.log('Initializing angular app');



var services = angular.module('ffsServices', ['ngRoute','ngAnimate']);

var controllers = angular.module('ffsControllers', ['ngRoute','ngAnimate','ffsServices']);

var app = angular.module('ffsApp', ['ngRoute','ngAnimate','ffsControllers','ffsServices']);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'default.html',
        controller: 'CalendarCtrl'
      });

    $locationProvider.html5Mode(true);
}]);


