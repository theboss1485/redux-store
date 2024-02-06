
const mongoose = require('mongoose');

const { Schema } = mongoose;

// This file defines the Order model for this application.
const orderSchema = new Schema({

    purchaseDate: {

        type: Date,
        default: Date.now
    },

    products: [
        
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
