'use strict';

module.exports = function(app){
	var question = require('../controllers/QuestionController');

	// Question routes
	app.route('/questions')
		.get(question.list_all_questions)
		.post(question.create_a_question);

	app.route('/tema/:temaId/questions')
		.get(question.list_questions_for_tema);

	app.route('/question/:qId')
		.get(question.read_a_question)
		.put(question.update_a_question)
		.delete(question.delete_a_question);

	app.route('/options')
		.get(question.list_all_options)
		.post(question.create_a_option);

	app.route('/question/:qId/option/:oId')
		.delete(question.delete_a_option);


}