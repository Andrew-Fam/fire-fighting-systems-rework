var errorManager = {};

errorManager.types = {};

errorManager.createErrorType = function(options) {
	var errorType = {};
	errorType.type = options.type;
	errorType.desc = options.desc;
	errorType.wiki = options.wiki;
	errorType.happens = options.happens || function(message) {
		return errorManager.createError(
			message,
			errorType
		);
	}

	return errorType;
}

errorManager.createError = function(message, options){
	var err = {};
	err.status = 'ERROR';
	err.type = options.type || errorManager.types.generic.type;
	err.desc = options.desc || errorManager.types.generic.desc;
	err.message = message || 'Empty message';

	return err;
}

errorManager.generic = errorManager.createErrorType(
	{
		type: 'generic',
		desc : 'Anything not included in other catagories',
		wiki : 'errors/generic'
	}
);

errorManager.database = errorManager.createErrorType({
	type : 'database-generic',
	desc : 'A database query fails and the cause is either unknown or purposely not exposed to client',
	wiki : 'errors/database-generic' 
});

errorManager.responseNotInitialized = errorManager.createErrorType({
	type : 'response-not-initialized',
	desc : 'A response object is not properly populated with data',
	wiki : 'erros/response-not-initialized'
});

errorManager.resourceNotFound = errorManager.createErrorType({
	type : 'resource-not-found',
	desc : 'A requested resource (e.g : file, database record) does not exist',
	wiki : 'errors/resource-not-found'
});

module.exports = errorManager;