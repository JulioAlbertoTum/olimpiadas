'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExamSchema = new Schema({
	course:{
		type: String,
		Required: 'El Curso al que corresponde el examen'
	},
	type_exam:{
		type: [{
			type:String,
			enum: ['parcial','final']
		}],
		default: ['parcial']
	},
	Created_date:{
		type:Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Exams',ExamSchema);