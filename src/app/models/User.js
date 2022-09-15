const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
	firstName: String,
	lastName: String,
	birth: String,
	gender: String,
	phone: Number,
    email: String,
  	address: String,
	image: {
		name: String,
		url: String,
	},
	department: String,
	departmentEng: String,
	position: String,
	positionEng: String,
	account: String,
	password: String,
	role: String,
	roleEng: String,
	description: String,
	customers: [
		{ 
			type: Schema.Types.ObjectId,
			ref: 'Customer',
		},
		{
			timestamps: true
		}
	],
	stateUser: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', User);