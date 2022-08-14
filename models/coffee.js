const mongoose = require("mongoose");

const coffeeSchema = mongoose.Schema({
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
   
    
    
})


coffeeSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id }; 
});


const coffee = mongoose.model('Coffee', coffeeSchema)
module.exports = { coffee, coffeeSchema };