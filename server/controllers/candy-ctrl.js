const Candy = require('../models/candy-model');

const addCandy = async (req , res) => {
    const candy = new Candy(req.body);
    try {
        await candy.save();
        res.status(200).json({ status: 200, type: 'success' , message: 'Candy successfully added!' });
    } catch(err) {
        if(err.keyValue && err.keyValue.candyName) {
            res.status(400).json({ status: 400, type: 'info' , message: 'Candy name already exists!' });
        }
        else {
            res.status(400).json({ status: 400, type: 'error' , message: `Oops, an error occurred  : ${err.message}` });
        }
    }
}

const getCandies = async (req, res) => {
    try {
        const candies = await Candy.find({});
        if(!candies.length) {
            res.status(404).json({ status: 404 , type: 'error' , message: 'There is no candies' });
        } else {
            res.status(200).json({ status: 200 , candies });
        }
    } catch(err) {
        res.status(400).json({ status: 400, type: 'error' , message: `Oops, an error occurred  : ${err.message}` });
    }
}

module.exports = {
    addCandy,
    getCandies,
}