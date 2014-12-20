var mysql = require('mysql'); 
var conf = require('../config/database');



var pool  = mysql.createPool({
  connectionLimit : conf.connectionLimit,
  host            : conf.db_host,
  user            : conf.db_user,
  password        : conf.db_pw,
  database		  : conf.db_name
});


module.exports = pool;
