'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseTreeAncestors = require('mongoose-tree-ancestors');

var CategorySchema = new Schema({
	name:{
		type:String,
		default: 'uname'
	},
	description:{
		type:String,
		default: 'Unknown description'
	},
	parent : {type:Schema.ObjectId, ref:"Category"},
	children : {type:Schema.ObjectId, ref:"Category"}
});

module.exports = mongoose.model('Categories',CategorySchema);