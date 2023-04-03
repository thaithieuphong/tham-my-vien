const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const Reexamination = new Schema({
	cusID:
	{
		type: String,
		ref: "Customer"
	},

	serviceNoteID:
	{
		type: String,
		ref: "ServiceNote"
	},

	reExamScheduleID:
	{
		type: String,
		ref: "ReExaminationSchedule"
	},

	userID:
	{
		type: String,
		ref: "User"
	},

	performer:
	{
		type: String,
		ref: "User"
	},

	nursing: [
		{
			type: String,
			ref: "User"
		}
	],

	status:
	{
		type: String,
		ref: "Status"
	},

	reExamImg: [
		{
			name: {
				type: String,
			},
			url: {
				type: String,
			},
			notDeletedYet: Boolean
		}, {
			timestamps: true
		}
	],

	reExamVideo: [
		{
			name: {
				type: String,
			},
			url: {
				type: String
			},
			notDeletedYet: Boolean
		}, {
			timestamps: true
		}
	],

	comments: [
		{
			comment: String
		}
	],
	statusInfo: String,
	directedByDoctor: String,
	stepsToTake: String,
	isDone: false,
	reExaminationDate: String,
	times: String,
	reExaminationArea: String,
}, {
	timestamps: true
});

Reexamination.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: 'all',
});

module.exports = mongoose.model('Reexamination', Reexamination);