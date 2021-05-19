const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/candy-shop',{ useNewUrlParser: true , useUnifiedTopology: true, })
.catch(err => { console.error('Connection error', err.message) });
const userRouter = require('./routers/user-router');
const candyRouter = require('./routers/candy-router');
const app = express();

app.use(express.json());
app.use(cors({ origin: ["http://localhost:8080"], credentials: true, }));

app.use('/api' , userRouter);
app.use('/api' , candyRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT);