const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema({
	content: String,
	createdAt: {type: Date, default: Date.now},
	updateAt: {type: Date, default: Date.now},
	deletedAt: {type: Date, default: Date.now},

});

module.exports = mongoose.model('Comment', Comment);