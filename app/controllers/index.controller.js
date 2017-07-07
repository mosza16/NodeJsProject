exports.render = function(req,res){
	var isLoggedIn = false;
	var email = '';
	console.log('session : '+req.session.remember)
	if(typeof req.session.remember !=='undefined'){
		isLoggedIn = req.session.remember;
		email = req.session.email;

	}
	res.render('index',{
		'title':'Kuy rai m ai sus',
		'message':'how are things',
		isLoggedIn : isLoggedIn,
		email : email,
	});
}