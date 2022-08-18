const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Customer = new Schema({
	firstName: String,
	lastName: String,
	birth: String,
	gender: String,
	phone: Number,
	email: String,
	address: String,
	description: String,
	image: {
		name: String,
		url: String,
	},
	comments: [
		{
			type: new mongoose.Schema(
				{
					comment: String,
				},
				{ timestamps: true }
			)
		}
	],
	userID:
	{
		type: String,
		ref: "User"
	},
	serviceNoteID: [
		{
			type: String,
			ref: "ServiceNote"
		}
	],

	reexamID: [
		{
			type: String,
			ref: "Reexamination"
		}
	]
}, {
	timestamps: true
});

module.exports = mongoose.model('Customer', Customer);