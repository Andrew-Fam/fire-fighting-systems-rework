/* search service */

var services = angular.module('ffsServices');

services.factory('ffsSearch',[ '$http',
	function($http) {

		var self = {};

		self.searchables = [];

		self.getSearchables = function(callback) {
			if(self.searchables.length==0) {
				$http.get('/api/v1/search/searchables').success(function(data){
					callback(data);
					self.searchables = data;
				});
			} else {
				callback(self.searchables);
			}
		};

		// self.selectSite = function(site) {
		// 	self.selectedSite = site;
		// }

		return self;
	}
]);