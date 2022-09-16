const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const Customer = new Schema({
	firstName: String,
	lastName: String,
	birth: String,
	gender: String,
	phone: Number,
	email: String,
	address: String,
	description: String,
	resource: String,
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
	userID:
	{
		type: String,
		ref: "User"
	},
	serviceNoteID: [
		{
			type: String,
			ref: "ServiceNote"
		}
	],
	reexamID: [
		{
			type: String,
			ref: "Reexamination"
		}
	],
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