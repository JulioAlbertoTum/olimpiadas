
'use strict';
var mongoose = require('mongoose'),
	Tema = mongoose.model('Temas');
	// Category  = mongoose.model('Categories');

exports.list_all_temas = function(req, res){
	Tema.find({},function(err,tema){
		if(err)
			res.send(err);
		res.json(tema);
	});
};

exports.list_tema_for_area = function(req, res){

	Tema.find({'subarea':req.params.areaId.toString()}, function(err, tema){
		if(err)
			res.send(err);
		res.json(tema);
	});
}

exports.create_a_tema = function(req, res){
	var new_tema = new Tema(req.body);
	new_tema.save(function(err, tema){
		if(err)
			res.send(err);
		res.json(tema)
	});
};

exports.read_a_tema = function(req, res){
	Tema.findById(req.params.temaId, function(err, tema){
		if(err)
			res.send(err);
		res.json(tema);
	});
};

exports.update_a_tema = function(req, res){
	
	Tema.findOneAndUpdate({'_id':req.params.temaId}, req.body, {new:true}, function(err, tema){
		if(err)
			res.send(err);
		res.json(tema);
	});
};

exports.delete_a_tema = function(req, res){
	Tema.remove({
		_id:req.params.temaId
	},function(err, tema){
		if(err)
			res.send(err);
		res.json({message:'Area borrada exitosamente'})
	});
};







