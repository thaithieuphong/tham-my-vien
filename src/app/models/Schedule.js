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
	schedule: String,
}, {
    timestamps: true
});

Schedule.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: 'all',
});

module.exports = mongoose.model('Schedule', Schedule);

