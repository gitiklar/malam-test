const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

const checkAccessToken = async (req, res, next) => {
    if(!req.headers["x-access-token"]) return next();
    const accessToken = req.headers["x-access-token"];
    try {
        const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
        if (exp < Date.now().valueOf() / 1000) {
            return res.status(401).json({ status: 401 , type: 'error' , message: 'Your session expired Please login again' });
        }
        res.locals.loggedInUser = await User.findById(userId);
        next();
    } catch(err) {
        res.status(401).json({ status: 401, type: 'error' , message: `Your session expired Please login again` });
    }
}

module.exports = checkAccessToken;