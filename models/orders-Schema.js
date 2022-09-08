const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    ID: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    orderedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "pending",
        required: true,
    },
    imageUrl: {
        type: String
    }
});

const OrderModel = mongoose.model("Order", orderSchema);
module.exports = OrderModel;