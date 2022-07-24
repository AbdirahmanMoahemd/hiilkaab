require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const adminRouter = require('./routes/admin');
const { authRouter } = require('./routes/auth');
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/categorey');
const userRouter = require('./routes/user');

//init server
const app = express();
const db_url = "mongodb+srv://developerkaahiye:kaahiye1234@cluster0.vowdb.mongodb.net/flutter_ecommerce?retryWrites=true&w=majority"

//middleware
app.use(express.json())
app.use(authRouter)
app.use(adminRouter)
app.use(productRouter)
app.use(categoryRouter)
app.use(userRouter)

//DB connection
mongoose.connect(db_url).then( ()=>{
    console.log('Connected to database')
}).catch( e=>{
    console.log(e)
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', ()=> {
    console.log(`connected at port ${PORT}`);
})