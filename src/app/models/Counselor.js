const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Counselor = new Schema({
    service: String,
    img: [{
        name: String,
        id: String,
        mimeType: String,
    }],
}, {
    timestamps: true
});

module.exports = mongoose.model('Counselor', Counselor);

