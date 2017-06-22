'use strict';

var jwt = require('jwt-simple'),
	moment = require('moment'),
	config = require('../config');


exports.isAuth = function(req, res, next){
	console.log("ingresando a auth");
	if(!req.headers.authorization){
		return res.status(403).send({message: "No tienes autorizacion"});
	}

	var token = req.headers.authorization.split(" ")[1];
	var payload = jwt.decode(token,config.SECRET_TOKEN);


	if(payload.exp <= moment().unix()){
		return res.status(401).send({message: "El token ha expirado"});
	}

	req.user = payload.sub;
	console.log('saliendo de middleware');
	next()
}

// module.exports = isAuth; 
