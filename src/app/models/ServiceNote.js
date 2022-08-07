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

	counselorImg: [
		{
			type: String,
		}
	],

	counselorVideo: [
		{
			type: String,
		}
	],

	beforeImg: [
		{
			type: String,
		}
	],
	beforeVideo: [
		{
			type: String,
		}
	],
	
	afterImg: [
		{
			type: String,
		}
	],

	afterVideo: [
		{
			type: String,
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