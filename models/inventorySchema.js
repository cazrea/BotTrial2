const {model, Schema} = require("mongoose");

module.exports = model(
    'invetory', new Schema ({
        Guild: {type: String},
        User: {type: String},
        inventory: {type: Object},
    })
    
)