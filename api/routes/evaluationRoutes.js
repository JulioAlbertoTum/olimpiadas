'use strict';
module.exports = function(app){
	var evaluation = require('../controllers/EvaluationController');

	// evaluation Routes

	app.route('/evaluations')
		.get(evaluation.list_all_evaluations)
		.post(evaluation.create_a_evaluation);

	app.route('/evaluation/:evalId')
		.get(evaluation.read_a_evaluation)
		.put(evaluation.update_a_evaluation)
		.delete(evaluation.delete_a_evaluation);

	app.route('/evaluation/:evalId/questions')
		.put(evaluation.populate_evaluation_questions);
};