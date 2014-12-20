var apiv1= {};

/* define api route and descriptions */

apiv1 = {};

apiv1.sites = [];

apiv1.sites.push({
	id : "v1-get-site-by-id",
	action : "GET",
	url : "/api/v1/sites/",
	syntax : "/api/v1/sites/{id}/{year}/{month}/{day}",
	desc : "Retrieve info of a site matching {id}. [optional] {year}/{month}/{day} will limit the time range from which testsheets will be retrieved.",
	fields : [
		{
			name : "id",
			type : "int",
			desc : "A unique site id auto-generated by the database"
		},
		{
			name : "pin",
			type : "string",
			desc : "A supposedly unique PIN associated with the site. This is used to match the site in FFS's database with DHS's own."
		},
		{
			name : "type",
			type : "object",
			desc : "Site type",
			fields : [
				{
					name : "id",
					type : "int",
					desc : "A unique id for site type"
				},
				{
					name : "name",
					type : "string",
					desc : "Human readable site type"
				}
			]
		},
		{
			name : "address",
			type : "object",
			desc : "Site's full address",
			fields : [
				{
					name : "number",
					type : "string",
					desc : ""
				},
				{
					name : "street",
					type : "string",
					desc : ""
				},
				{
					name : "suburb",
					type : "object",
					desc : "",
					fields : [
						{
							name : "id",
							type : "int",
							desc : ""
						},
						{
							name : "name",
							type : "string",
							desc : ""
						}
					]
				}

			]
		},
		{
			name : "testsheets",
			type : "array",
			desc : "Return all testsheets associated with this site by default. Can be limited by adding {year}/{month}/{day} to url",
			fields : [
				{
					name : "id",
					type : "int"
				},
				{
					name : "test_sheet_number",
					type : "int"
				},
				{
					name : "type",
					type : "object",
					fields : [
						{
							name : "id",
							type : "int"
						}
					]
				},
				{
					name : "interval",
					type : "array",
					desc : "All interval associated with this test sheet (a test sheet can have multiple interval)",
					fields : [
						{
							name : "id",
							type : "int"
						}
					]
				}
			]
		},
		{
			name : "note",
			type : "string",
			desc : "Hand-added note that are not included in any other standard field"
		},
		{
			name : "date",
			type : "timestamp",
			desc : "Date written on test sheet"
		},
		{
			name : "date_created",
			type : "timestamp",
			desc : "Date entered into database"
		},
		{
			name : "date_modified",
			type : "timestamp",
			desc : "Date last modified"
		},
		// {
		// 	name : "sites",
		// 	type : "array",
		// 	desc : "id's of all sites associated with this testsheet"
		// },
		{
			name : "scan_url",
			type : "string",
			desc : "Url to the scan image file"
		}
	]
});





module.exports = apiv1;