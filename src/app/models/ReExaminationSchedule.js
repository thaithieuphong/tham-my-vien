const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");


const ReExaminationSchedule = new Schema({
    cusID:
	{
		type: String,
		ref: "Customer"
	},

	userID:
	{
		type: String,
		ref: "User"
	},

	serviceNoteID:
	{
		type: String,
		ref: "ServiceNote"
	},
	reExamID:
	{
		type: String,
		ref: "Reexamination"
	},
	hasReExam: false,
	isDone: false,
	status: String,
	schedule: String,
	times: String,
	isReExamInfo: false,
	reasons: [{
		type: String
	}]

}, {
    timestamps: true
});

ReExaminationSchedule.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: 'all',
});

module.exports = mongoose.model('ReExaminationSchedule', ReExaminationSchedule);

