const mongoose = require("mongoose");

const MealCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    
    
})


MealCategorySchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id }; 
});


const MealCategory = mongoose.model('MealCategory', MealCategorySchema)
module.exports = { MealCategory, MealCategorySchema };