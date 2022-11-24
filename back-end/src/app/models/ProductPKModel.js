const monggose = require("mongoose"); // use library mongoose
const Schema = monggose.Schema; // use Schema of mongoose

// init Schema CardProduct
const ProductPK = Schema({
    namePK: {
        type: String,
        required: true,
    },
    imgPK: {
        type: String,
        required: true,
        trim: true,
    },
    descriptionPK: {
        type: String,
        required: true,
    },
    pricePK: {
        type: Number,
        required: true,
    },
    vote: {
        type: Number,
    },

},
    {
        timestamps: true
    }
);

module.exports = monggose.model('productPKs', ProductPK)
