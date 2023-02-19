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
	isCustomerInfo: false,
	isServiceInfo: false,
	isCounselorInfo: false,
	isBeforeInfo: false,
	isInSurgeryInfo: false,
	isAfterInfo: false,
	
	userID:
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
			notDeletedYet: Boolean
		}
	],

	counselorVideo: [
		{
			name: {
				type: String,
			},
			url: {
				type: String,
			},
			notDeletedYet: Boolean
		}
	],


	status: String,

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
			},
			notDeletedYet: Boolean
		}
	],

	beforeVideo: [
		{
			name: {
				type: String,
			},
			url: {
				type: String,
			},
			notDeletedYet: Boolean
		}
	],

	inSurgeryImg: [
		{
			name: {
				type: String,
			},
			url: {
				type: String,
			},
			notDeletedYet: Boolean
		}
	],
	
	inSurgeryVideo: [
		{
			name: {
				type: String,
			},
			url: {
				type: String,
			},
			notDeletedYet: Boolean
		}
	],
	
	afterImg: [
		{
			name: {
				type: String,
			},
			url: {
				type: String,
			},
			notDeletedYet: Boolean
		}
	],

	afterVideo: [
		{
			name: {
				type: String,
			},
			url: {
				type: String,
			},
			notDeletedYet: Boolean
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
	logIDs: [
		{
			type: String,
			ref: "Log"
		}
	]
}, {
	timestamps: true
});

ServiceNote.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: 'all',
});

module.exports = mongoose.model('ServiceNote', ServiceNote);