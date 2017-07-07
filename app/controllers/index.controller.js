exports.render = function(req,res){
	var isLoggedIn = false;
	var email = '';
	var youtube = '';
	console.log('session : '+req.session.remember)
	if(typeof req.session.remember !=='undefined'){
		isLoggedIn = req.session.remember;
		email = req.session.email;
		youtube = req.session.youtube;
	}
	res.render('index',{
		'title':'hi son',
		'message':'how are things',
		isLoggedIn : isLoggedIn,
		email : email,
		youtube : youtube
	});
}