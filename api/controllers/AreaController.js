
'use strict';
var mongoose = require('mongoose'),
	Area = mongoose.model('Areas');
	

exports.list_all_areas = function(req, res){
	Area.find({},function(err,area){
		if(err)
			res.send(err);
		// console.log(res.json(area));
		res.json(area);
	});
};

exports.list_all_subareas = function(req, res){

	Area.find({'parent':req.params.subareaId.toString()}, function(err, area){
		if(err)
			res.send(err);
		res.json(area);
	});
}

exports.create_a_area = function(req, res){
	var new_area = new Area(req.body);
	new_area.save(function(err, area){
		if(err)
			res.send(err);
		res.json(area)
	});
};

exports.read_a_area = function(req, res){
	Area.findById(req.params.areaId, function(err, area){
		if(err)
			res.send(err);
		res.json(area);
	});
};

exports.update_a_area = function(req, res){
	
	Area.findOneAndUpdate({'_id':req.params.areaId}, req.body, {new:true}, function(err, area){
		if(err)
			res.send(err);
		res.json(area);
	});
};

exports.delete_a_area = function(req, res){
	Area.remove({
		_id:req.params.areaId
	},function(err, area){
		if(err)
			res.send(err);
		res.json({message:'Area borrada exitosamente'})
	});
}

exports.es_privado = function(req, res){
	res.status(200).send({message:"tienes acceso"});
}

exports.read_a_tree = function(req, res){
	Area.find({'parent':null},function(err,areas){
		if(err)
			res.send(err);
		var new_areas = []
	

		for(var i=0; i<areas.length; i++){
			var new_area ={}
			new_area._id = areas[i]._id;
			new_area.name = areas[i].name;
			//new_area.description = areas[i].description;
			//new_area.created_date = areas[i].created_date;
			//new_area.__v = areas[i].__v;
			new_area.subareas = [];
			new_areas.push(new_area);

			// var subarea = Area.find({'parent':new_area._id.toString()},function(err, sub){
			// 	if(err)
			// 		res.send(err);
			// 	res.json(sub)
			// });

			// console.log(subarea);
		}
		// console.log(areas);
		let subareas = []
		for(var i=0; i<new_areas.length; i++){
			let area = new_areas[i];
			
			Area.find({'parent':area._id.toString()})
			.exec(function(err,sub){
				console.log("Nombre del area ",area.name);
				if(err)
					res.send(err);
				
				//if(sub != []){
				area.subareas.push(sub);
					// console.log(area.name,sub);
				//}
			});
			
		}
		console.log(subareas);
		res.json(new_areas);
	});



};



