const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const Reexamination = new Schema({
	name: String,
	customerID:
	{
		type: String,
		ref: "Customer"
	},

	serviceNoteId:
	{
		type: String,
		ref: "ServiceNote"
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

	reExamImg: [
		{
			type: String,
		}
	],

	reExamVideo: [
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
}, {
	timestamps: true
});

Reexamination.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: 'all',
});

module.exports = mongoose.model('Reexamination', Reexamination);