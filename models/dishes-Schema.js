const mongoose = require("mongoose")

const dishSchema = mongoose.Schema({
    name: {
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
    buyers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    discontinuedAt: {
        type: Date
    },
    imageUrl:{
        type:String
    }
});

const DishModel = mongoose.model("Dish", dishSchema);
module.exports = DishModel;