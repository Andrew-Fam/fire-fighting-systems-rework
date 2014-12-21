/* sites service */

var services = angular.module('ffsServices');

services.factory('ffsSites',[ '$http',
	function($http) {
		return {
			getAllSites: function(callback) {
				$http.get('/api/v1/sites').success(callback);
			}
		}
	}
]);