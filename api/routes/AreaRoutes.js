'use strict';

module.exports = function(app){
	
	var area = require('../controllers/AreaController');
	var auth  = require('../middlewares/auth');

	// Area Routes
	
	app.route('/private')
		.get(auth.isAuth,area.es_privado);

	app.route('/areas')
		.get(auth.isAuth,area.list_all_areas)
		.post(auth.isAuth,area.create_a_area);

	app.route('/:subareaId/subareas')
		.get(auth.isAuth,area.list_all_subareas);

	app.route('/areas/:areaId')
		.get(auth.isAuth,area.read_a_area)
		.put(auth.isAuth,area.update_a_area)
		.delete(auth.isAuth,area.delete_a_area);

	app.route('/treeview')
		.get(auth.isAuth,area.read_a_tree);

}