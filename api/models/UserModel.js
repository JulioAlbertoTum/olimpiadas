'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
	username: {
		type: String,
		required: true
	},

	email:{
		type:String,
		unique:true,
		lowercase:true,
		required:true
	},

	password:{
		type: String,
		required: true
	},

	rol: {
		type:String,
		enum: ['estudiante','admin','evaluador'],
		default: ['estudiante']
	},

	verify:{
		type:Boolean,
		default:false
	},

	active:{
		type:Boolean,
		default:true
	}
},{
	timestamps:true
});

UserSchema.pre('save', function(next){
	let user = this;
	if(!user.isModified('password')) return next()

	bcrypt.genSalt(10, (err, salt) => {
		if (err) return next()

		bcrypt.hash(user.password, salt, null, (err,hash) => {
			if(err) return next(err)

			user.password = hash;
			next()
		})
	})
})


module.exports = mongoose.model('Users',UserSchema);