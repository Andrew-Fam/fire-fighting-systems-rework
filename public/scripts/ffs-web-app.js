/* fss angular web app */

console.log('Initializing angular app');



var services = angular.module('ffsServices', ['ngRoute','ngAnimate','ui.bootstrap']);

var controllers = angular.module('ffsControllers', ['ngRoute','ngAnimate','ffsServices','ui.bootstrap']);

var directives = angular.module('ffsDirectives',['ngRoute','ngAnimate','ffsServices','ui.bootstrap']);

var app = angular.module('ffsApp', ['ngRoute','ngAnimate','ffsControllers','ffsServices','ffsDirectives','ui.bootstrap']);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/database/', {
        templateUrl: '/scripts/angular-views/calendar.html',
        controller: 'CalendarCtrl'
      }).
      when('/database/calendar', {
      	templateUrl: '/scripts/angular-views/calendar.html',
        controller: 'CalendarCtrl'
      }).
      otherwise({
      	templateUrl: '/scripts/angular-views/otherwise.html',
      	controller: 'OtherwiseCtrl'
      });

    $locationProvider.html5Mode(true);
}]);


