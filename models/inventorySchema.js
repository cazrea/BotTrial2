const mongoose = require('mongoose');

const invSchema = new mongoose.Schema({
        Guild: {type: String},
        User: {type: String},
        inventory: {type: Object},
});

const model = mongoose.model("inventory", invSchema);

module.exports = model;