const {model, Schema} = require("mongoose");

module.exports = model(
    'inventory', new Schema ({
        Guild: {type: String},
        User: {type: String},
        inventory: {type: Object},
    })
    
)