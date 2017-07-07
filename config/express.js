var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var compression = require('compression');
var sass = require('node-sass-middleware');
var validator = require('express-validator');
var cookieSession = require('cookie-session');
var session = require('express-session');
var config  = require('./config');


module.exports = function(){
	var app = express();
	if(process.env.NODE_ENV === 'development'){
		
		app.use(morgan('dev'));
	} else {
		app.use(compression);
	}
	/*app.use(cookieSession({
		name:'cookieA',
		keys:['asdsadsd']
	}));*/
	app.use(session({
		secret: config.sessionSecret,
		resave:false,
		saveUninitialized:true
	}));
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(validator());
	app.set('views','./app/views');
	app.set('view engine','jade');
	require('../app/routes/index.routes')(app);
	require('../app/routes/user.routes')(app);
	require('../app/routes/test.routes')(app);
	app.use(sass({
		src: './sass',
		dest: './public/css',
		outputStyle:'expanded',// suggest to use 'compressed' when change NODE_ENV=product
		prefix: '/css',
		debug:true//show debug
		//indentedSyntax:true when use .sass file
	}))
	app.use(express.static('./public'));
	return app;
}