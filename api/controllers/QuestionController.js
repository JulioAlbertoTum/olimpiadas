'use strict';

var mongoose = require('mongoose'),
		Tema = mongoose.model('Temas'),
	Question = mongoose.model('Questions'),
	Option = mongoose.model('Options');


exports.list_all_questions = function(req, res){
	Question.find({})
	.populate('options')
	.exec(function(err, questions){
		if(err)
			res.send(err);
		res.json(questions);
	});
};

exports.read_a_question = function(req,res){
	Question.findById(req.params.qId)
	.populate('options')
	.exec(function(err, question){
		if(err)
			res.send(err);
		console.log(question)
		res.json(question)
	});
};


exports.create_a_question = function(req, res){
	var object = {	description:req.body.description,
					type_question:req.body.type_question,
					level:req.body.level,
					tema:req.body.tema
				 };
	var new_question = new Question(object);
	new_question.save(function(err, question){
		if(err)
			res.send(err);
	});

	if(new_question.type_question == 'multiple'){
			var new_options = req.body.options;
			
			for (var i=0; i<new_options.length; i++){
				var option = new_options[i];
				var op = new Option({description:option.description, isCorrect:option.isCorrect});
				// console.log(op);
				op.save(function(err,option){
					if(err)
						res.send(err);
					// res.json(option)
					// console.log(option);
					
				});
				new_question.options.push(op._id);
				new_question.save(function(err,question){ if(err) res.send(err)});
			}
		}

	
	res.json(new_question);
};

exports.list_questions_for_tema = function(req, res){

	Question.find({'tema':req.params.temaId.toString()})
	.populate('options')
	.exec(function(err, questions){
		if(err)
			res.send(err);
		// console.log(questions);
		res.json(questions);
	});
}

exports.update_a_question = function(req, res){

	var object = {	description:req.body.description,
					type_question:req.body.type_question,
					level:req.body.level,
					tema:req.body.tema
				 };

	Question.findOneAndUpdate({'_id':req.params.qId}, object, {new:true}, function(err, question){
		if(err)
			res.send(err);

	var options = req.body.options || [];

	for(var i=0; i<options.length; i++){
		var opParam = options[i];
		if(opParam._id){
			Option.findOneAndUpdate({'_id':opParam._id},{description:opParam.description, isCorrect:opParam.isCorrect},function(err,option){
				if(err)
					res.json(err);
			});
		}else{
			var new_option = new Option({description:opParam.description, isCorrect:opParam.isCorrect});
			new_option.save(function(err, option){
				if(err)
					res.send(err);
			});

			question.options.addToSet(new_option._id);
			question.save(function(err,question){ if(err) res.send(err)});
			
			console.log("se crea",opParam.description)
		}
	}

	res.json(question);

	});

	

};

exports.delete_a_question = function(req, res){
	Question.findById(req.params.qId)
	.exec(function(err, question){
		if(err)
			res.json(err);
		var options_id = question.options
		for (var i=0; i<options_id.length; i++){
			var id = options_id[i];
			Option.remove({
				_id:id
			},function(err, option){
				if(err)
					res.send(err);
			});
		}
		Question.remove({
			_id:req.params.qId
		},function(err, question){
			if(err)
				res.send(err);
			res.json({message:'Area borrada exitosamente'})
		});
	});

	
}

exports.create_a_option = function(req, res){
	var new_option = new Option(req.body);

	new_option.save(function(err, option){
		if(err)
			res.send(err);
		res.json(option)
	});	
};

exports.delete_a_option = function(req, res){
	Question.findById(req.params.qId)
	.exec(function(err,question){
		if(err)
			res.json(err)
		question.options.remove(req.params.oId);
		question.save(function(err,q){if(err) res.json(err)});

	});

	Option.remove({
		_id:req.params.oId
	},function(err, option){
		if(err)
			res.send(err);
		res.json({message:'Area borrada exitosamente'})
	});
}

exports.list_all_options = function(req,res){
	Question.findById('593b596e1c480e1face66874')
	.populate('tema')
	.populate('options')
	.exec(function(err, question){
		if(err)
			res.send(err);
		// question.options.push('593b59a91c480e1face66875');
		// question.save(function(err){if(err) return err;});
		res.json(question);
	});
}