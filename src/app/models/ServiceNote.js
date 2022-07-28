const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const ServiceNote = new Schema({
	name: String,
	customer: [
		{
			type: new mongoose.Schema(
				{
					name: String,
					birth: String,
					gender: String,
					email: String,
					phone: Number,
					address: String,
				},
				{ timestamps: true }
			),
			ref: "Customer"
		}
	],

	result: [
		{
			type: new mongoose.Schema(
				{
					serviceName: String,
					before: String,
					after: String,
				},
				{ timestamps: true }
			),
		}
	],

	createName: [
		{
			type: String,
			ref: "User"
		}
	],

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

	recept: [
		{
			type: String,
			ref: "User"
		}
	],

	status: [
		{
			type: String,
			ref: "Status"
		}
	],
	services: [
		{
			type: String,
			ref: "Service"
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
}, {
	timestamps: true
});

ServiceNote.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: 'all',
});

module.exports = mongoose.model('ServiceNote', ServiceNote);