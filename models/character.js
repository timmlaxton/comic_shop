const mongoose = require('mongoose');

const characterSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    }
},);

const Character = mongoose.model('Character', characterSchema);

module.exports = {Character}



