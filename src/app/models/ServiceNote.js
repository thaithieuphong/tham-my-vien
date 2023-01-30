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
	
	floor: String,

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

	inSurgeryImg: [
		{
			name: {
				type: String,
			},
			url: {
				type: String,
			}
		}
	],
	
	inSurgeryVideo: [
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
	reExamID:
	{
		type: String,
		ref: "Reexamination"
	},
	total: String,
	discount: String,
	amountToBePaid: String,
	totalServiceCharge: String,
	counselorInfo: String,
	beforeInfo: String,
	stepsToTake: String,
	statusAfterInfo: String,
	directedByDoctor: String,
	afterInfo: String,
	stored: String,
	surgeryDay: String,
	reason: String,
	priceBefore: String,
	deposit: String,
	logStatus: [
		{
			type: new mongoose.Schema(
				{
					statusServiceNote: String,
					createID: String,
				},
				{ timestamps: true }
			)
		}
	],
}, {
	timestamps: true
});

ServiceNote.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: 'all',
});

module.exports = mongoose.model('ServiceNote', ServiceNote);