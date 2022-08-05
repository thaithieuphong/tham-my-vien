const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const ServiceNote = new Schema({
	name: String,
	customerID:
	{
		type: String,
		ref: "Customer"
	},

	createName:
	{
		type: String,
		ref: "User"
	},

	performer: [
		{
			type: String,
			ref: "User"
		}
	],

	nursing: [
		{
			type: String,
			ref: "User"
		}
	],

	recept:
	{
		type: String,
		ref: "User"
	},

	status:
	{
		type: String,
		ref: "Status"
	},

	service: [
		{
			type: String,
			ref: "Service"
		}
	],

	counselorID: [
		{
			type: String,
			ref: "Counselor"
		}
	],

	beforeID: [
		{
			type: String,
			ref: "Before"
		}
	],
	
	afterID: [
		{
			type: String,
			ref: "After"
		}
	],
	
	comments: [
		{
			comment: String
		}
	],
	stored: String,
	schedule: String,
	reason: String,
	price: String,
}, {
	timestamps: true
});

ServiceNote.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: 'all',
});

module.exports = mongoose.model('ServiceNote', ServiceNote);