const express = require('express');
const CategoryModel = require('../models/category');

const router = express.Router();

router.get('/show', async (request, response) => {
    const categories = await CategoryModel.find({});
    response.status(200).json(categories);
});

router.post('/add', async (request, response) => {
    const { name } = request.body;
    if (!name) {
        return response.status(400).send('Input required!');
    }
    //creating document/Category for entered details
    const newCat = new CategoryModel({
        name,
    });

    try {
        //saving the doc/Category to database collection
        const saveCat = await newCat.save();
        response.status(201).send("Category created with ID: " + saveCat.id);
    } catch (e) {
        response.status(501).send(e.message)
    }
});

router.post('/delete/:id', async (request, response) => {
    //console.log(request.params.id);
    try {
        await CategoryModel.updateOne({ _id: request.params.id }, { active: false });
        response.status(202).send("Category Marked IN-Active with ID: " + request.params.id);
    } catch (e) {
        response.status(501).send(e.message)
    }
})

module.exports = router;