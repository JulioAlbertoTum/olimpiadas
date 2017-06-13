'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OptionSchema = new Schema({
	description:{
		type: String
	},
	isCorrect:{
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('Options',OptionSchema);