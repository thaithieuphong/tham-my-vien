const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");


const Schedule = new Schema({
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

	hasServiceNote: false,

	beforeCounselorImg: [
		{
			name: {
				type: String,
			},
			url: {
				type: String,
			},
		}
	],

	beforeCounselorVideo: [
		{
			name: {
				type: String,
			},
			url: {
				type: String,
			}
		}
	],

	status: String,

	service: [
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
	priceBefore: String,
	deposit: String,
	schedule: String,
	reason: String,
	logIDs: [
		{
			type: String,
			ref: "Log"
		}
	]
}, {
    timestamps: true
});

Schedule.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: 'all',
});

module.exports = mongoose.model('Schedule', Schedule);

