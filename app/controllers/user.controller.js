exports.login = function(req,res){
	console.log(req.body);
	console.log(req.body.email);
	console.log(req.body.password);
	console.log(req.body.remember);
	console.log("url: "+req.body.youtube_url);
	req.check('email','Invalid email').notEmpty().isEmail();
	req.sanitizeBody('email').normalizeEmail();
	var errors = req.validationErrors();
	var autoplay = req.body.autoplay;
	var youtube = req.body.youtube_url;
	var email = req.body.email;
	if(errors){
		res.render('index',{
			title:'some one wrong',
			isLoggedIn:false
		})
		return;
	}
	if(youtube.indexOf("watch?v=")>-1){
		youtube = youtube.replace("watch?v=","embed/")
	}
	if((autoplay*1)===1){
		youtube = youtube.concat("?autoplay=1");
	}
	if(req.body.remember ==='remember'){
		req.session.remember = true;
		req.session.email = req.body.email;
		email = req.session.email;
		req.session.on = 'session is on';
		req.session.youtube = youtube;
	}
	res.render('index',{
		title:'Logged in as cookie1 is',
		email : email,
		isLoggedIn:true,
		youtube:youtube,
		imSession:req.session.on
	})

};
exports.logout = function(req,res){
	req.session.destroy();
	req.session=null;
	res.render('index'),{
		title:'login',
		isLoggedIn:false
	}
}