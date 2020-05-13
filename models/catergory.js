const mongoose = require('mongoose');

const catergorySchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    }
});

const Catergory = mongoose.model('Catergory', catergorySchema);

module.exports = {Catergory}