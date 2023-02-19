const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const Customer = new Schema({
	identification: String,
	nickName: String,
	fullName: String,
	birth: String,
	gender: String,
	height: String,
	weight: String,
	homeTown: String,
	phone: Number,
	email: String,
	address: String,
	description: String,
	resource: String,
	logIDs: [
		{
			type: String,
			ref: "Log"
		}
	],
	storage: String,
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
	userID: {
		type: String,
		ref: "User"
	},
	scheduleID: [{
		type: String,
		ref: "Schedule"
	}],
	hasSchedule: false,
	serviceNoteID: [
		{
			type: String,
			ref: "ServiceNote"
		}
	],
	hasServiceNote: false,
	reexamID: [
		{
			type: String,
			ref: "Reexamination"
		}
	],
	hasReExam: false,
	statusCus: {
		statusVi: String,
		statusEng: String	
	},
}, {
	timestamps: true
});

Customer.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: 'all',
});

module.exports = mongoose.model('Customer', Customer);