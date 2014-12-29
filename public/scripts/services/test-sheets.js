/* test-sheets service */

var services = angular.module('ffsServices');

services.factory('ffsTestSheets',[ '$http',
	function($http) {

		var self = {};

		self.getTestSheets = function(callback,query) {

			var api = '/api/v1/testsheets/';

			if(query && query.length>0) {

				api+='?';
				

				for(var i =0; i<query.length;i++) {
					if(i>0) {

						api+='&';

					}
					api+=query[i].name+'='+query[i].value;
				}

			}



			$http.get(api).success(function(data){
				callback(data);
				console.log(data);
			});
		};

		self.getTypes = function(callback,query) {
			var api = '/api/v1/testsheets/types/';

			if(query && query.length>0) {

				api+='?';
				

				for(var i =0; i<query.length;i++) {
					if(i>0) {

						api+='&';

					}
					api+=query[i].name+'='+query[i].value;
				}

			}



			$http.get(api).success(function(data){
				callback(data);
				console.log('got types');
				console.log(data);
			});
		}

		return self;
	}
]);