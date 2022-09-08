const mongoose = require("mongoose")
// name,active(boolean),createdAt

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const CategoryModel = mongoose.model("Category", categorySchema);
module.exports = CategoryModel;