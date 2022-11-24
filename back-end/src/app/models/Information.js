const mongoose = require('mongoose');

const InfoSchema = new mongoose.Schema({
    Inforname: {
        type: String,
        require: true, 
    },
    Inforphone: {
        type: Number,
        required: true,
    },
    Inforemail: {
        type: String,
        required: true,
    },
    Inforcomment: {
        type: String,
        required: true,
    },

})
module.exports = mongoose.model("CskhData", InfoSchema);