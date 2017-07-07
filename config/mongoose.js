var mongoose = require('mongoose');
var config  = require('./config');

module.exports = function(){
	var uri=config.mongoUri;
	var db = mongoose.connect(uri);
	return db;
}