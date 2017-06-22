'use strict';

module.exports = function(app){
	var user = require('../controllers/UserController');

	// User routes
	app.route('/auth/signup')
		.post(user.email_signup);

	app.route('/auth/login')
		.post(user.email_login);

	app.route('/user/:userId')
		.put(user.update_a_user);

	app.route('/user/rude/:userId')
		.put(user.verify_for_rude);

}