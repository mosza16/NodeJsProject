module.exports = function(app){
	var test = require('../controllers/test.controller');
	app.all('/test',test.test);

}