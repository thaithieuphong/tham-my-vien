const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Counselor = new Schema({
    filename: String,
    img: {
        name: String,
        id: String,
        mimeType: String,
        folderId: String
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Counselor', Counselor);

