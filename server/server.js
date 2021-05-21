const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('./models/user-model');

const userRouter = require('./routers/user-router');
const candyRouter = require('./routers/candy-router');

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const app = express();

const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/candy-shop',{ useNewUrlParser: true , useUnifiedTopology: true, })
        .then(() => { console.log('Connected to the Database successfully');})
        .catch(err => { console.error('Connection error', err.message) });

app.use(express.json());
app.use(cors({ origin: ["http://localhost:8080"], useCredentials: true, }));

//Checking each request with "x-access-token"
app.use(async (req, res, next) => {
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
});

app.use('/api' , userRouter);
app.use('/api' , candyRouter);

app.listen(PORT, () => {
    console.log('Server is listening on Port:', PORT)
});