const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");


const WoundCleaning = new Schema({
    cusID: {
		type: String,
		ref: "Customer"
	},

	userID: {
		type: String,
		ref: "User"
	},

	woundCleaningScheduleID: {
		type: String,
		ref: "WoundCleaningSchedule"
	},
	
	serviceNoteID: {
		type: String,
		ref: "ServiceNote"
	},

	performer: {
		type: String,
		ref: "User"
	},
	woundCleaningArea: String,
	status: String,
	woundCleaningDay: String,
	times: String,
	statusInfo: String,
	directedByDoctor: String,
	stepsToTake: String,
	isDone: false,
	woundCleaningImg: [
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

	woundCleaningVideo: [
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

}, {
    timestamps: true
});

WoundCleaning.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: 'all',
});

module.exports = mongoose.model('WoundCleaning', WoundCleaning);

