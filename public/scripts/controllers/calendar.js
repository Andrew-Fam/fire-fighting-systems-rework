/* calendar controller*/



var app = angular.module('ffsControllers');

app.controller('CalendarCtrl', ['$scope','$rootScope','$timeout','$route', '$routeParams', '$location', 'ffsSites','ffsSearch', 'ffsTestSheets',function($scope, $rootScope, $timeout, $route, $routeParams, $location, Sites, Search, TestSheets) {
    	console.log('CalendarCtrl initialized');

        $scope.rootScope = $rootScope;

        $scope.site = $rootScope.selectedSite;


        // update test sheets needed

        var updateTestSheets = function() {


            $scope.site = $rootScope.selectedSite;

            if($scope.site) {
                TestSheets.getTestSheets(function(data){
                    $scope.testSheets = data;
                    console.log($scope.testSheets);
                },[
                    {
                        name: 'site',
                        value: $scope.site.id
                    },
                    {
                        name: 'year',
                        value: $scope.selectedYear
                    },
                    {
                        name: 'month',
                        value: $scope.selectedMonth.number
                    }
                ]);
            }
        }

        var updateTestSheetTypes = function() {
            $scope.testSheetTypes = [];

            TestSheets.getTypes(function(data){

                console.log("Organize test sheet types");


                for(var i = 0; i < data.length; i++) {
                    var type = data[i];
                    $scope.testSheetTypes[type.ID+""] = {
                        type: type.type,
                        short_type: type.short_type
                    }  
                }

                console.log($scope.testSheetTypes);
               
            });



        }

        updateTestSheetTypes();


        $scope.$watch(function(){
            return $rootScope.selectedSite;
        }, updateTestSheets);

        $scope.$watch(function(){
            return $scope.selectedMonth;
        },  updateTestSheets);
	}
]);