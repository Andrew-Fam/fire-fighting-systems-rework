var express = require('express');
var color = require('cli-color');
var moment = require('moment');
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

var handleQuery = function(req, res, err, rows, fields, messages) {
	try {
		if (err) {
			throw error.database.happens(messages.databaseFailed || "Failed to establish connection to database");
		}

		if (rows.length == 0) {
			throw error.resourceNotFound.happens(messages.notFound || "No related resource found.");
		}


		/* retrieve test sheets if year||month||day available */

		result = rows;

	} catch (error) {
		console.error(color.red("Error occured: "+error.type+":"+error.message));
		result = error;
	} finally {

		if(result===undefined) {
			result = error.responseNotInitialized.happens("Either the developer haven't yet completed this function or something sneakily failed.");
		}

		var response = JSON.stringify(result);

		

		res.end(response);
	}
}

/* GET /api/v1/sites */

router.get('/v1/sites/', function(req,res) {
	console.log('Receive request for sites');

	res.writeHead(200, {"Content-Type": "application/json"});

	var query = 'SELECT * FROM '+db_config.views.sites;

	var result;

	console.log('Executed query: '+query);


	db.query(query, function(err, rows, fields) {
		handleQuery(req,res,err,rows,fields, {
			databaseFailed : "Failed to request for sites from the database",
			notFound : "We find no sites in the database. This should not happen, so contact support immediately"
		});
	});
});


router.get('/v1/sites/:id/:year?/:month?/:day?/', function(req,res) {
	console.log('Receive request for site with id '+req.params.id+' and data from '+req.params.day+'/'+req.params.month+'/'+req.params.year);
	
	res.writeHead(200, {"Content-Type": "application/json"});


	var query = 'SELECT * FROM '+db_config.views.sites+' WHERE ID = '+req.params.id;

	var result;

	console.log('Executed query: '+query);

	db.query(query, function(err, rows, fields) {
		handleQuery(req,res,err,rows,fields, {
			databaseFailed : "Failed to request for sites from the database",
			notFound : "No site with matching id found. If you believe this is wrong, pelase contact support immediately"
		});

	});
});


/* GET /api/v1/search/searchables */

router.get('/v1/search/searchables/', function(req,res) {
	console.log('Receive request for searchable key terms');

	res.writeHead(200, {"Content-Type": "application/json"});

	var query = 'SELECT * FROM '+db_config.views.searchables;

	var result;

	console.log('Executed query: '+query);


	db.query(query, function(err, rows, fields) {
		handleQuery(req,res,err,rows,fields, {
			databaseFailed : "Failed to request searchable keywords",
			notFound : "This should not happen, so contact support immediately"
		});
	});
});


/* GET /api/v1/testsheets/types/ */

router.get('/v1/testsheets/types/', function(req,res) {
	console.log('Receive request for test sheet types');

	

	var query = 'SELECT * FROM '+db_config.tables.test_sheet_types;

	res.writeHead(200, {"Content-Type": "application/json"});


	var result;

	console.log('Executed query: '+query);


	db.query(query, function(err, rows, fields) {
		handleQuery(req,res,err,rows,fields, {
			databaseFailed : "Failed to request for test sheet types",
			notFound : "No test sheet types found."
		});
	});
});

/* GET /api/v1/testsheets/?site=id */

router.get('/v1/testsheets/', function(req,res) {
	console.log('Receive request for testsheets from site matching {id:}');

	

	var query = 'SELECT * FROM '+db_config.tables.test_sheets+' as t, '+db_config.tables.r_sites_test_sheets+' as rts WHERE t.id=rts.test_sheet_id AND rts.site_id = '+req.query.site;

	if(req.query.month&&req.query.year) {
		// use moment to get timestamp of first date and last date of the month

		var mO = new moment();


		console.log('month received: '+req.query.month);

		


		console.log(mO.format('YYYY-MM-DD'));

		var from = moment([req.query.year, req.query.month, 1]).format("YYYY-MM-DD");
		query += ' AND t.date >= \''+from+'\'';


		

		var to = moment([req.query.year, parseInt(req.query.month)+1, 1]).subtract(1,'days').format('YYYY-MM-DD');

		

		query += ' AND t.date <= \''+to+'\'';
		
	}

	res.writeHead(200, {"Content-Type": "application/json"});


	var result;

	console.log('Executed query: '+query);


	db.query(query, function(err, rows, fields) {
		handleQuery(req,res,err,rows,fields, {
			databaseFailed : "Failed to request for test sheets from site with id "+req.query.site,
			notFound : "No test sheets found for the site with id "+req.param.site
		});
	});
});




module.exports = router;
