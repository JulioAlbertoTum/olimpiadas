'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AreaSchema = new Schema({
	name:{
		type:String,
		default: 'uname',
		Required: 'Se necesita el nombre al que corresponde el examen'
	},
	description:{
		type:String,
		default: 'Unknown description'
	},
	created_date:{
		type:Date, 
		default: Date.now
	},
	parent : {
		type:Schema.ObjectId, ref:"Areas"
	},
	children : {
		type:Schema.ObjectId, ref:"Areas"
	}
});

module.exports = mongoose.model('Areas',AreaSchema);