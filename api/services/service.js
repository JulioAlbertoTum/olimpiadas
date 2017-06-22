'use strict';

var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../../config');

exports.createToken = function(user){
 	const payload = {
 		sub: user._id,
 		iat: moment().unix(),
 		exp: moment().add(14, 'days').unix(),
 	}

 	return jwt.encode(payload, config.SECRET_TOKEN)
}

exports.decodeToken = function(token){
	const decoded = new Promise(function(resolve, reject){
		try{
			const payload = jwt.decode(token, config.SECRET_TOKEN)
			if(payload.exp <= moment().unix()){
				reject({
					status: 401,
					message:"El token ha expirado"
				});
			}

			resolve(payload.sub)

		}catch(err){
			reject({
				status:500,
				message:"Invalid Token"
			});
		}
	})

	return decoded
}