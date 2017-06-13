'use strict';

var mongoose = require('mongoose'),
	Exam = mongoose.model('Exams');

exports.index = function(req, res){
	res.sendfile('././public/index.html');
};

exports.list_all_exams = function(req, res){
	Exam.find({}, function(err, exam){
		if(err)
			res.send(err);
		res.json(exam);
	});
};

exports.create_a_exam = function(req, res){
	var new_exam = new Exam(req.body);
	new_exam.save(function(err, exam){
		if(err)
			res.send(err);
		res.json(exam)
	});
};

exports.read_a_exam = function(req, res){
	Exam.findById(req.params.examId, function(err, exam){
		if(err)
			res.send(err);
		res.json(exam);
	});
};

exports.update_a_exam = function(req, res){
	Exam.findOneAndUpdate(req.params.examId, req.body, {new:true}, function(err, exam){
		if(err)
			res.send(err);
		res.json(exam)
	});
};

exports.delete_a_exam = function(req, res){
	Exam.remove({
		_id: req.params.examId
	}, function(err, exam){
		if(err)
			res.send(err);
		res.json({message:'Examen borrado exitosamente'});
	});
};