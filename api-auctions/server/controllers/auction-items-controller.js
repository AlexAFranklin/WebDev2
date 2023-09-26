
const {Auction}  = require("../models")
const validator = require('email-validator');

module.exports = {

    getAll: async (req, res) => {
        const listOfItems = await Auction.findAll();
        res.json(listOfItems).status(200);

    },
    createPost: async (req, res) => {
        
        const post = req.body;
        if (isPostValid(post, req, res)) {
            await Auction.create(post);
            res.json(post).status(201);
        }


    }, 
    getById: async (req, res) => {
        const id = req.params.id;
        const item = await Auction.findAll({
            where: {
                id: id
            }
        })
        res.json(item).status(200);
    }

}

function isPostValid(post, req, res){
   
    let pattern = /^[A-Za-z.\s_-]+$/;
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

