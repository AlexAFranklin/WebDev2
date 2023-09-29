
const {Auction}  = require("../models")
const validator = require('email-validator');

module.exports = {

    getAll: async (req, res) => {
        // intentionally send error 
        res.status(500).json({ message: "Internal server error" });
        return;
        try{
            const listOfItems = await Auction.findAll();
            res.json(listOfItems).status(200);
        } catch (error){
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }


    },
    createPost: async (req, res) => {
        try {
            const post = req.body;
            if (isPostValid(post, req, res)) {
                const createdPost = await Auction.create(post);
                res.json(createdPost).status(201);
            }
        } catch (error){
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
        
    }, 
    getById: async (req, res) => {
        try {
            const id = req.params.id;
            const item = await Auction.findByPk(id)
            res.json(item).status(200);
        } catch (error){
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }

    },
    updateBidPrice: async (req, res) => {
        const updateItem = req.body; 
        const updateId = req.params.id;
    
        try {
            const item = await Auction.findByPk(updateId)
            if (item === null) {
                return res.status(400).json({ message: "Item Not Found" });
            }
            if (isPatchValid(item, updateItem, req, res)) {
                item.lastPrice = updateItem.lastPrice;
                item.lastBidderEmail = updateItem.lastBidderEmail;
                const newItem = await item.save();
                // TODO check old values against new ones
                // is this if necessary? - double check docs 
                if (!newItem){
                    throw Error("Item not updated");
                }
                res.status(200).json(newItem);
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    

}

function isPostValid(post, req, res){
   // TODO add validator npm 
    let pattern = /^[A-Za-z\. _-]+$/;
    if (!validator.validate(post.sellerEmail)) {
        res.status(400).send({
            message: "Must provide valid email address."
        });
        return false;
    }
    
    if (post.itemName.length > 100 || post.itemName.length < 2){
        res.status(400).send({
            message: "Item name must be between 2 and 100 characters long."
        });
        return false;
    }
    if (!pattern.test(post.itemName)){
        res.status(400).send({
            message: "Item name must be comprised of only alphanumeric characters, and ', . - '."
        });
        return false;
    }
    if (post.itemDescription.length > 10000 || post.itemDescription.length < 2){
        res.status(400).send({
            message: "Item description must be between 2 and 10 000 characters."
        });
        return false;
    }
    if (post.lastPrice < 0) {
        res.status(400).send({
            message: "The price must be above $0.00."
        });
        return false;
    }

    return true;
}

function isPatchValid(oldItem, newItem, req, res){
    if (!validator.validate(newItem.lastBidderEmail)) {
        res.status(400).send({
            message: "Must provide valid email address."
        });
        return false;
    }
    if (oldItem.lastPrice >= newItem.lastPrice) {
        res.status(400).send({
            message: "New Price must be higher than last bidding price"
        });
        return false;
    }
    return true;
}

