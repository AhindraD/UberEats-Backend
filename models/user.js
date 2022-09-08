const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    ads: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ad',
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;