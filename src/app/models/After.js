const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const After = new Schema({
    service: String,
    img: {
        name: String,
        id: String,
        mimeType: String,
        folderId: String
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('After', After);

