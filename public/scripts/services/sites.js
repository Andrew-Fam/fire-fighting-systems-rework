/* sites service */

var services = angular.module('ffsServices');

services.factory('ffsSites',[ '$http',
	function($http) {

		var self = {};

		self.sites = [];

		self.getAllSites = function(callback) {
			if(self.sites.length==0) {
				$http.get('/api/v1/sites').success(function(data){
					callback(data);
					self.sites = data;
				});
			} else {
				callback(self.sites);
			}
		};

		// self.selectSite = function(site) {
		// 	self.selectedSite = site;
		// }

		return self;
	}
]);