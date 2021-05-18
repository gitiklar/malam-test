const User = require('../models/user-model');

const createUser = async (req , res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(200).json({ status:200, type:'success' , message: 'User successfully added!' });
    } catch(err) {
        if(err.keyValue && err.keyValue.email) {
            res.status(400).json({ status:400, type:'info' , message: 'Email already exists!' });
        }
        else {
            res.status(400).json({ status:400, type:'error' , message: `Oops, an error occurred  : ${err.message}` });
        }
    }
}

const login = async (req , res) => {
    const { email , password } = req.body;
    try {
        const user = await User.findOne({ email , password });
        if(!user) {
            res.status(401).json({ status:401 , type:'error' , message: 'The email and/or password is incorrect' });
        } else {
            res.status(200).json({ status:200 , user });
        }
    } catch(err) {
        res.status(400).json({ status:400, type:'error' , message: `Oops, an error occurred  : ${err.message}` });
    }
}

module.exports = {
    createUser,
    login,
}