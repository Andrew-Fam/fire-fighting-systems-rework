var dbconf = {
	connectionLimit : 20,
	db_name : 'firefigh_database',
	db_user : 'ffs_web_app',
	db_pw : 'KwVXd8Sc862nTcat',
	db_host : 'localhost',
	tables : {
		sites : 'site_list',
		test_sheets : 'reports',
		test_sheet_types : 'report_type',
		r_sites_test_sheets: 'report_site_relation'
	},
	views : {
		sites : 'sites_detail',
		searchables : 'searchables'
	}
};

module.exports = dbconf;