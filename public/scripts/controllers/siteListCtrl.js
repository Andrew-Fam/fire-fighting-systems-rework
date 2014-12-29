/* site List controller*/



var app = angular.module('ffsControllers');

app.controller('siteListCtrl', ['$scope','$rootScope','$timeout','$route', '$routeParams', '$location', 'ffsSites','ffsSearch', function($scope, $rootScope, $timeout, $route, $routeParams, $location, Sites, Search) {
    	console.log('siteListCtrl initialized');

    	$scope.sites = [];

    	$scope.rootScope = $rootScope;

    	Sites.getAllSites(function(data) {
    		$scope.sites = data;
    	});

    	Search.getSearchables(function(data){
    		$scope.searchables = data;
    	})

    	$scope.searchTerm = 'highrise';

    	$scope.fieldsToSortBy = [
    		{
    			name : 'Suburb',
    			id : 'suburb'
    		},{
    			name : 'Number',
    			id : 'number'
    		}, {
    			name : 'Street',
    			id : 'street'
    		}, {
    			name : 'PIN',
    			id : 'pin'
    		}
    	]

    	$scope.fieldToSortBy = $scope.fieldsToSortBy[0];


    	$scope.sortBy = function (field) {
    		$scope.fieldToSortBy = field;
    	}

    	$scope.ordersToSortBy = [
    		{
                name: 'ASC',
                reverse: false
            },
            {
                name: 'DESC',
                reverse: true
            }
    	];

    	$scope.orderToSortBy = $scope.ordersToSortBy[0];

    	$scope.orderBy = function (order) {
    		$scope.orderToSortBy = order
    	}

    	$scope.updateSearchTermTimeout = {};

    	$scope.updateSearchTerm = function() {
    		
    		console.log("updateSearchTerm");

    		$timeout.cancel($scope.updateSearchTermTimeout);

    		$scope.updateSearchTermTimeout = $timeout(function(){
    			$scope.searchTerm = $scope.tempSearchTerm;
    			$scope.$apply();
    		},500);
    	
    	}


        $scope.selectSite = function(site) {
            site.selected = true;
            if($rootScope.selectedSite) {
                $rootScope.selectedSite.selected = false;
            }
            $rootScope.selectedSite = site;
        }


	}
]);