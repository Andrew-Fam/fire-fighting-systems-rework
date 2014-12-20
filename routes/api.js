var express = require('express');
var apiconf = require('../config/api/v1');
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


router.get('/v1/sites/:id/:year/:month/:day', function(req,res) {
	console.log('Receive request for site with id '+req.params.id+' and data from '+req.params.day+'/'+req.params.month+'/'+req.params.year);
	
	res.writeHead(200, {"Content-Type": "application/json"});

	var site = JSON.stringify({

	});

	res.end(site);


	
});




module.exports = router;
