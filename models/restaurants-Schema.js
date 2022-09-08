const mongoose = require("mongoose")
// title, description, price, seller (user id), category (category id), interestedBuyers[], buyer

const restaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cuisine: {
        type: String,
    },
    address: {
        type: String,
    },
    dishes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Dish",
        }
    ],
    oders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
        }
    ],
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
    deletedAt: {
        type: Date
    },
    imageUrl: {
        type: String
    }
});

const RestaurantModel = mongoose.model("Restaurant", restaurantSchema);
module.exports = RestaurantModel;