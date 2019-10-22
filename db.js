const mongoose = require('mongoose');

var urlSchema = mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    }
});

var Url = mongoose.model('URL', urlSchema);
module.exports = Url;