const mongoose = require('mongoose');

const dailySchema = new mongoose.Schema({
        Guild: {type: String, required: true},
        User: {type: String, required: true},
    }, {
        timestamps: true,
    }

);

const model = mongoose.model("daily", dailySchema);

module.exports = model;