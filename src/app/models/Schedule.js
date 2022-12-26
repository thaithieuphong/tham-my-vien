const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");


const Schedule = new Schema({
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

	serviceNoteID:
	{
		type: String,
		ref: "ServiceNote"
	},

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
	
	comments: [
		{
			comment: String
		}
	],
	priceBefore: String,
	deposit: String,
	schedule: String,
	reason: String,
	logSchedules: [
		{
			type: new mongoose.Schema(
				{
					schedule: String,
					reason: String,
					userID: String
				},
				{ timestamps: true }
			)
		}
	],
}, {
    timestamps: true
});

Schedule.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: 'all',
});

module.exports = mongoose.model('Schedule', Schedule);

