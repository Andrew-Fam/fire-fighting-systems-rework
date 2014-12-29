var express = require('express');
var router = express.Router();



router.get(['/','*'], function(req,res) {
	console.log('Database web app accessed');
	res.render('database/database', { title: 'FFS Database' });
});






module.exports = router;
