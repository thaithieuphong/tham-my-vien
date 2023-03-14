const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");


const WoundCleaningSchedule = new Schema({
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
	woundCleaningID:
	{
		type: String,
		ref: "WoundCleaning"
	},
	hasWoundCleaning: false,
	status: String,
	schedule: String,
	times: String,
	isWoundCleaningInfo: false,
	isDone: false,
	reasons: [{
		type: String
	}]

}, {
    timestamps: true
});

WoundCleaningSchedule.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: 'all',
});

module.exports = mongoose.model('WoundCleaningSchedule', WoundCleaningSchedule);

