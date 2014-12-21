/* main controller*/



var app = angular.module('ffsControllers');

app.controller('siteListCtrl', ['$scope','$rootScope','$route', '$routeParams', '$location', 'ffsSites', function($scope, $rootScope, $route, $routeParams, $location, Sites) {
    	console.log('siteListCtrl initialized');

    	$scope.sites = [];

    	Sites.getAllSites(function(data) {
    		$scope.sites = data;
    		$scope.$apply();
    	});

	}
]);