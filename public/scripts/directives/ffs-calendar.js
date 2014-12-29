/* ffs-calendar directive*/



var app = angular.module('ffsDirectives');

app.directive('ffsCalendar', function() {

	console.log('ffsCalendar initialized');

    function _buildMonth(s) {


    	s.mO.year(s.selectedYear);
    	s.mO.month(s.selectedMonth.name);
    	s.mO.date(1);

    	s.weeks = [];

    	var done = false;


    	var currentMonth = s.mO.month()+"";

    	s.mO.subtract(0+s.mO.day(),'days');

    	var t = 0;

    	var testSheets = s.testSheets?s.testSheets.slice():undefined;

    	var testSheetsClone = s.testSheets.slice();

    	while (!done) {

    		var week = [];

    		t++;


    		for(var i = 0; i<7;i++) {
    			
    			

    			var day = {};

    			day.date = s.mO.format('DD');
    			day.month = s.mO.format('MM');
    			day.year = s.mO.year();
    			day.moment = s.mO.clone();
    			day.text = day.year+'-'+day.month+'-'+day.date;
    			day.thisMonth = s.mO.month() == currentMonth;
    			day.testSheets = [];
    			day.today = s.mO.format('YYYY-MM-DD') == s.today;

    			// var added =  0;
    			
    			// if(testSheets && added < testSheets.length) {
    			// 	for(var t = 0; t< testSheets.length; t++) {
	    		// 		var testSheet = testSheets[t];

	    		// 		console.log(testSheet.date+":"+day.year+"-"+day.month+"-"+day.date);

	    		// 		if(testSheet.date.indexOf(day.year+"-"+day.month+"-"+day.date)>=0) {
	    					
	    		// 			day.testSheets.push(testSheet);
	    		// 			added++;
	    		// 		}	    				
	    				
	    		// 	}
    			// }

    			
    			
    			


    			week.push(day);

    			s.mO.add(1,'days');

    		}





    		s.weeks.push(week);
    		done = s.mO.month() > currentMonth || ( currentMonth == 11 && s.mO.month() == 0 );
    		
    	}
       	
    }

	return {
		templateUrl: '/scripts/angular-views/ffs-calendar-directive.html',
		scope: {
			"site" : "=",
			"testSheets" : "=",
			"selectedMonth" : "=",
			"selectedYear" : "=",
			"types" : "="
		},
		link: function(s, e, a) {

			var dateFormat = 'YYYY-MM-DD';

			if(!s.testSheets) {
				s.testSheets = [];
			}

			s.monthly = 0;
			s.yearly = 1;

			s.moment = moment;

			s.mO = new moment();



			s.currentView = s.monthly;

			s.daysOfWeek = [];

			for(var i=0; i<7;i++) {
				s.daysOfWeek.push({
					name: s.mO.weekday(i).format('ddd')
				});
			}

			s.months = [];

			for(var i=0; i<12;i++) {
				s.months.push({
					name : s.mO.month(i).format('MMMM'),
					abbr : s.mO.month(i).format('MMM'),
					number : i
				});
			}

			var today = new moment();

			s.today = today.format('YYYY-MM-DD');

			s.thisMonth = today.get('month');

			s.selectedMonth = s.months[s.thisMonth];

			s.thisYear = today.get('year');

			s.selectedYear = s.thisYear;


			s.firstYear = 2012;

			s.years = [];

			for (var i = s.firstYear; i <= s.thisYear; i++) {
				s.years.push(i);
			}

			s.selectMonth = function(month) {
				s.selectedMonth = month;
				s.updateCalendar();
			}

			s.selectYear = function(year) {
				s.selectedYear = year;
				s.updateCalendar();
			}

			s.updateCalendar = function() {
				_buildMonth(s);
				s.updateTestSheets();
			}

			s.updateTestSheets = function() {

				s.organizedTestSheets = [];

				for (var i=0; i<s.testSheets.length; i++) {
					var sheet = s.testSheets[i];

					var date = moment(sheet.date);

					if(s.organizedTestSheets[date.format(dateFormat)]==undefined) {
						s.organizedTestSheets[date.format(dateFormat)] = [];
					}

					s.organizedTestSheets[date.format(dateFormat)].push(sheet);
				}

				console.log(s.organizedTestSheets);
			}




			s.$watch(function(){
				return s.testSheets;
			}, function() {
				s.updateTestSheets();
			});

			s.$watch(function(){
				return s.types;
			}, function() {
				console.log(s.types);
			});



			s.updateCalendar();
		}
	};
});