var express = require('express');
var router = express.Router();

/* GET api */
router.get('/', function(req, res) {
  res.render('api', { title: 'FFS API' });
});

module.exports = router;
