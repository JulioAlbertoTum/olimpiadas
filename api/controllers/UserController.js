'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('Users'),
	service = require('../services/service'),
	bcrypt = require('bcrypt-nodejs');

var request = require('request');

exports.email_signup = function(req, res){

	var user = new User({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		rol: req.body.rol
	});

	User.findOne({ email:req.body.email }, function(err,user){
		if(err) res.status(500).send({message: `Error al crear el usuario: ${err}`});
		if(user) res.status(500).send({message: `Ya existe un usuario con el email: ${user.email}`});
	})

	user.save(function(err,user){
		if(err) res.status(500).send({message: `Error al crear el usuario: ${err}`})

		return res.status(200).send({
			token: service.createToken(user),
			user:{
				_id:user._id,
				username: user.username,
				email: user.email,
				rol:user.rol,
				active:user.active,
				verify:user.verify
			}
		});
	});
}

exports.update_a_user = function(req, res){
	User.findOneAndUpdate({'_id':req.params.userId},req.body,{new:true},function(err,user){
		if(err)
			res.send(err);
		res.json({
				_id:user._id,
				username: user.username,
				email: user.email,
				rol:user.rol,
				active:user.active,
				verify:user.verify
			})
	})
}

exports.email_login = function(req, res){
	User.findOne({ email:req.body.email },function(err, user){
		if(err){
			return res.status(500).send({message: err})	
		}
		

		if(!user){
			return res.status(404).send({message: "No existe el usuario"})	
		}

		if(!bcrypt.compareSync(req.body.password,user.password)){
			return res.status(404).send({message: "El password es incorrecto"})		
		}
		
		req.user = user;
		res.status(200).send({
			message:'Te has logueado correctamente',
			token: service.createToken(user),
			user:{
				_id:user._id,
				username: user.username,
				email: user.email,
				rol:user.rol,
				active:user.active,
				verify:user.verify
			}
		})
		
	})
}

exports.verify_for_rude = function(req, res){
	var rude = null;
	request('http://localhost:3000/rude/'+req.body.rude, function(error,response,body){
		if(error)
			res.json(error)
		if(response.statusCode == 404){

			return res.status(404).send(JSON.parse(body));
		}

		User.findOneAndUpdate({'_id':req.params.userId}, {verify:true}, {new:true}, function(err, user){
			if(err)
				res.send(err);

			res.status(200).send({
				_id:user._id,
				username: user.username,
				email: user.email,
				rol:user.rol,
				active:user.active,
				verify:user.verify
			});
		});

		// res.json(JSON.parse(body));
	})
	// console.log(rude)
	// res.json(rude);
}