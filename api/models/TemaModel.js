'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TemaSchema = new Schema({
	name:{
		type:String,
		default: 'uname',
		Required: 'Se necesita el nombre al tema'
	},
	description:{
		type:String,
		default: 'Unknown description'
	},
	created_date:{
		type:Date, 
		default: Date.now
	},
	subarea : {
		type:Schema.ObjectId, ref:"Areas"
	}

});

module.exports = mongoose.model('Temas',TemaSchema);