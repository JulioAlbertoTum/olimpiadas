'use strict';

var service = require('../services/service');


exports.isAuth = function(req, res, next){
	console.log("ingresando a auth");
	if(!req.headers.authorization){
		return res.status(403).send({message: "No tienes autorizacion"});
	}

	var token = req.headers.authorization.split(" ")[1];

	
	service.decodeToken(token)
	.then(function(response){
		req.user = response
		next()
	})
	.catch(function(response){
		res.status(response.status)
	})
}

// module.exports = isAuth 
