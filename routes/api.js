var express = require('express');

/* load configurations */

var apiconf = require('../config/api/v1');
var db_config = require('../config/database');

/* load utilities modules */

var error = require('../modules/error.js');
var db = require('../modules/db-pool');

var router = express.Router();


/* API reference */
router.get('/', function(req, res) {
  res.render('api', { 
  	title: 'FFS API'
  });
});

router.get('/v1', function(req, res) {
  res.render('api/v1', { 
  	title: 'FFS API | v1',
  	apiconf: apiconf
  });
});

/* GET /api/v1/sites */

router.get('/v1/sites/:id/:year?*/:month?*/:day?*', function(req,res) {
	console.log('Receive request for site with id '+req.params.id+' and data from '+req.params.day+'/'+req.params.month+'/'+req.params.year);
	
	res.writeHead(200, {"Content-Type": "application/json"});


	var query = 'SELECT * FROM '+db_config.tables.sites+' WHERE ID = '+req.params.id;

	var result;

	console.log('Executed query: '+query);


	db.query(query, function(err, rows, fields) {
		try {
			if (err) {
				throw error.database.happens('Failed to query sites from database');
			}

			if (rows.length == 0) {
				throw error.resourceNotFound.happens('No sites with matching id');
			}


			result = rows;

		} catch (error) {
			console.error("Error occured: "+error.type+":"+error.message);
			result = error;
		} finally {

			if(result===undefined) {
				result = error.responseNotInitialized.happens("Either the developer haven't yet completed this function or something sneakily failed.");
			}

			var response = JSON.stringify(result);

			

			res.end(response);
		}

	});
	
});




module.exports = router;
