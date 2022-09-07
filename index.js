require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const adminRouter = require('./routes/admin');
const { authRouter } = require('./routes/auth');
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/categorey');
const subcategoryRouter = require('./routes/subcategory');
const mealRouter = require('./routes/meal');
const mealcategoryRouter = require('./routes/meal_category');
const restaurantRouter = require('./routes/restuarants');
const coffeeRouter = require('./routes/coffee');
const sweetsRouter = require('./routes/sweets');
const userRouter = require('./routes/user');
const notificationRouter = require("./routes/notification");

//init server
const app = express();  
const db_url = "mongodb+srv://developerkaahiye:kaahiye1234@cluster0.vowdb.mongodb.net/flutter_ecommerce?retryWrites=true&w=majority"

//middleware
app.use(express.json())
app.use(authRouter)  
app.use(adminRouter)
app.use(productRouter)
app.use(categoryRouter)
app.use(subcategoryRouter)
app.use(userRouter)
app.use(mealRouter)
app.use(mealcategoryRouter)
app.use(restaurantRouter)
app.use(sweetsRouter)
app.use(coffeeRouter)
app.use(notificationRouter)

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