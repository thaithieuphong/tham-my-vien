const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const ServiceNote = new Schema({
	scheduleID:
	{
		type: String,
		ref: "Schedule"
	},

	fullName: String,
	
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

	counselorImg: [
		{
			name: {
				type: String,
			},
			url: {
				type: String,
			},
		}
	],

	counselorVideo: [
		{
			name: {
				type: String,
			},
			url: {
				type: String,
			}
		}
	],


	status:
	{
		type: String,
		ref: "Status"
	},

	service: [
		{
			name: String,
			price: String
		}
	],

	beforeImg: [
		{
			name: {
				type: String,
			},
			url: {
				type: String,
			}
		}
	],
	beforeVideo: [
		{
			name: {
				type: String,
			},
			url: {
				type: String,
			}
		}
	],
	
	afterImg: [
		{
			name: {
				type: String,
			},
			url: {
				type: String,
			}
		}
	],

	afterVideo: [
		{
			name: {
				type: String,
			},
			url: {
				type: String,
			}
		}
	],
	
	comments: [
		{
			comment: String
		}
	],
	total: String,
	stepsToTake: String,
	notes: String,
	stored: String,
	surgeryDay: String,
	reason: String,
	priceBefore: String,
	deposit: String,
}, {
	timestamps: true
});

ServiceNote.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: 'all',
});

module.exports = mongoose.model('ServiceNote', ServiceNote);