const express = require('express');
const UserModel = require('../models/user-Schema');
const RestaurantModel = require('../models/restaurants-Schema');
const OrderModel = require('../models/orders-Schema');
const DishModel = require('../models/dishes-Schema');
const jwt = require('jsonwebtoken');
const multer = require("multer");
const router = express.Router();


const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, "public/uploads")
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname)
        }
    }
);

const upload = multer({ storage: storage });

//SHOW ALL Rests
router.get('/all', async (request, response) => {
    const ads = await AdModel.find({})
        .populate("dishes", "name")
        .populate("buyers", "name")
        .populate("oders", "ID")

    response.status(200).json(ads);
});


//CREATE a new Rest
router.post('/new', upload.single('image'), async (request, response) => {
    const { title, desc, price, seller, category } = request.body;

    // let uploadedFile = request.file.filename;
    // uploadedFile = 'uploads/' + uploadedFile;
    // let imageUrl = process.env.BASE_URL + uploadedFile;
    //console.log(process.env.BASE_URL);
    console.log(imageUrl);
    if (!title || !desc || !price || !seller || !category) {
        return response.status(400).send('Input required!');
    }
    //creating document/Ads for entered details
    const newAds = new AdModel({
        title,
        desc,
        price,
        seller,
        category: category[1],
        imageUrl,
    });

    try {
        //saving the doc/Ads to database collection
        const saveAds = await newAds.save();

        //addind the Ad-ID to the seller profile
        await UserModel.updateOne({ _id: seller }, {
            $push: {
                "ads": saveAds.id
            }
        });

        response.status(201).send("Ad created with ID: " + saveAds.id);

    } catch (e) {
        response.status(501).send(e.message)
    }
});


//Delete AD
router.delete('/delete/:id', async (request, response) => {
    //console.log(request.params.id);
    try {
        await AdModel.deleteOne({ _id: request.params.id });
        response.status(202).send("Ad DELETED with ID: " + request.params.id);
    } catch (e) {
        response.status(501).send(e.message)
    }


})


//Interested Buyer Add
router.post('/:adId/buyers/:buyerId', async (request, response) => {
    //console.log(request.params.adId);
    try {
        await AdModel.updateOne({ _id: request.params.adId }, {
            $push: {
                "interestedBuyers": request.params.buyerId
            }
        });

        response.status(202).send("Buyer queued with ID: " + request.params.buyerId);
    } catch (e) {
        response.status(501).send(e.message)
    }
});


//Sold / Closed Ad
router.post('/:adId/sold/:buyerId', async (request, response) => {
    //console.log(request.params.adId);
    try {
        await AdModel.updateOne({ _id: request.params.adId }, {
            "closedAt": Date.now(),
            "buyer": request.params.buyerId
        });

        response.status(202).send("SOLD to Buyer with ID: " + request.params.buyerId);
    } catch (e) {
        response.status(501).send(e.message)
    }
})

module.exports = router;