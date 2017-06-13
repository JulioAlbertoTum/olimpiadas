'use strict';
module.exports = function(app){
	var exam = require('../controllers/ExamController');

	// Exam Routes

	app.route('/exams')
		.get(exam.list_all_exams)
		.post(exam.create_a_exam);

	app.route('/exams/:examId')
		.get(exam.read_a_exam)
		.put(exam.update_a_exam)
		.delete(exam.delete_a_exam);
};