'use strict';

var mongoose = require('mongoose'),
	Evaluation = mongoose.model('Evaluations');


exports.list_all_evaluations = function(req, res){
	Evaluation.find({}, function(err, evaluation){
		if(err)
			res.send(err);
		res.json(evaluation);
	});
};

exports.create_a_evaluation = function(req, res){
	var new_exam = new Evaluation(req.body);
	new_exam.save(function(err, evaluation){
		if(err)
			res.send(err);
		res.json(evaluation)
	});
};

exports.read_a_evaluation = function(req, res){

	Evaluation.findById(req.params.evalId)
	.populate({
		path: 'questions',
		populate: {path:'options'}
	})
	.exec(function(err, evaluation){
		if(err)
			res.send(err);
		console.log(evaluation)
		res.json(evaluation)
	});

};

exports.update_a_evaluation = function(req, res){
	var objeto = {	name:req.body.name,
					level:req.body.level,
					stage:req.body.stage,
					date_start:req.body.date_start,
					hour_start:req.body.hour_start,
					hour_end:req.body.hour_end
				 };
				 
	Evaluation.findOneAndUpdate({'_id':req.params.evalId}, objeto, {new:true}, function(err, evaluation){
		if(err)
			res.send(err);
		res.json(evaluation)
	});
};

exports.delete_a_evaluation = function(req, res){
	Evaluation.remove({
		_id: req.params.evalId
	}, function(err, evaluation){
		if(err)
			res.send(err);
		res.json({message:'Examen borrado exitosamente'});
	});
};

exports.populate_evaluation_questions = function(req, res){
	Evaluation.findById(req.params.evalId)
	.exec(function(err,evaluation){
		if(err)
			res.json(err);
		
		var questions = req.body.questions || [];
		evaluation.questions = [];
		for(var i=0; i<questions.length; i++){
			var question = questions[i];

			evaluation.questions.push(question._id);
			
		}

		evaluation.save(function(err, evaluation){
				if(err)
					res.send(err);
		});
		res.json(evaluation.questions);
	});
}