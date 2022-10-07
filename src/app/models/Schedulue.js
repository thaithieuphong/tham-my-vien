const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Account = new Schema({
	userName: {
		type: String,
		unique: true	
	},
  	email: {
		type: String,
		unique: true
	},
  	password: String,
	role: {
		type: String,
		unique: true
	} 
}, {
	timestamps: true
});

module.exports = mongoose.model('Account', Account);