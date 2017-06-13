'use strict';

module.exports = function(app){
	var tema = require('../controllers/TemarioController');

	// Area Routes
	app.route('/temario')
		.get(tema.list_all_temas)
		.post(tema.create_a_tema);

	app.route('/subarea/:areaId/temario')
		.get(tema.list_tema_for_area);

	app.route('/tema/:temaId')
		.get(tema.read_a_tema)
		.put(tema.update_a_tema)
		.delete(tema.delete_a_tema);

}