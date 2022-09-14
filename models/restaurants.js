const mongoose = require("mongoose");
const ratingSchema = require("./rating");

const restaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    logo:{
          type: String,
          required: true,
    },
    banner:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    time:{
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    message: {
        type: String,
        required: true,
    },
    ratings: [ratingSchema],
   
    
    
})


restaurantSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id }; 
});


const Restaurant = mongoose.model('Restaurant', restaurantSchema)
module.exports = { Restaurant, restaurantSchema };