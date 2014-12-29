/* ffs-calendar directive*/



var app = angular.module('ffsDirectives');

app.directive('vCenter', function() {

	console.log('ffsCalendar initialized');

	return {
		transclude: true,
		template: '<div class="v-center-wrapper"><div class="v-center-row"><div class="v-center-cell"><div ng-transclude></div></div></div></div>',
		link: function(s, e, a) {
			
		}
	};
});