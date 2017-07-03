'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EvaluationSchema = new Schema({
	name:{
		type: String,
		required:true
	},
	level:{
		type: String,
		enum:['primero','segundo','tercero','cuarto','quinto','sexto'],
		default: ['primero']
	},
	stage:{
		type: String,
		enum:['first','second','third','fourth'],
		default: ['first']
	},
	date_start:{
		type:Date
	},
	hour_start:{
		type:Date
	},
	hour_end:{
		type:Date
	},
	questions:[ {type: Schema.ObjectId, ref: 'Questions'} ]
},{
	timestamps:true
});

module.exports = mongoose.model('Evaluations',EvaluationSchema);