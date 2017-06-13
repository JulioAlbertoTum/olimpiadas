'use strict';

module.exports = function(app){
	var area = require('../controllers/AreaController');

	// Area Routes
	app.route('/areas')
		.get(area.list_all_areas)
		.post(area.create_a_area);

	app.route('/:subareaId/subareas')
		.get(area.list_all_subareas);

	app.route('/areas/:areaId')
		.get(area.read_a_area)
		.put(area.update_a_area)
		.delete(area.delete_a_area);

	app.route('/treeview')
		.get(area.read_a_tree);
}