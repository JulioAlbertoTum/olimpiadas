'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// var Tema = mongoose.model('Tema');
 
// var NumericSchema = new Schema({
// 	min:{
// 		type: Number,
// 		required:true
// 	},
// 	max:{
// 		type: Number,
// 		required:true
// 	},
// 	metric:{
// 		type: String,
// 	}
// });


var QuestionSchema = new Schema({
	description:{
		type:String,
		required:true
	},
	img_src:{
		type:String,
	},
	type_question:{
		type: String,
		enum:['simple','multiple','numeric'],
		default: ['simple']
	},
	tema:{
		type:  Schema.ObjectId, ref: 'Temas'
	},
	level:{
		type: String,
		enum:['easy','middle','hard'],
		default: ['easy']
	},
	options:[ {type: Schema.ObjectId, ref: 'Options'} ]
},{
	timestamps: true
});

module.exports = mongoose.model('Questions',QuestionSchema);