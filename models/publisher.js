const mongoose = require('mongoose');

const publisherSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength:100
    }
});


const Publisher = mongoose.model('Publisher', publisherSchema);

module.exports = {Publisher}