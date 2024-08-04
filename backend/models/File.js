const mongoose = require("mongoose")

const fileSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
    uploaded_at: {
        type: Date,
        default: Date.now,
    },
    uploaded_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

module.exports = mongoose.model("File", fileSchema)