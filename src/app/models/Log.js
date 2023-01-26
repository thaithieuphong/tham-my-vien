const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Log = new Schema({
    customerID: String,
    scheduleID: String,
    serviceNoteID: String,
    contents: Object,
}, {
    timestamps: true
});

module.exports = mongoose.model('Log', Log);

