const mongoose = require("mongoose");

const MealCategorySchema = mongoose.Schema({
    names: [
        {
          type: String,
          required: true,
         
        },
      ],
    restaurant:{
        type: String,
        required: true,
    },
    
})


MealCategorySchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id }; 
});


const MealCategory = mongoose.model('MealCategory', MealCategorySchema)
module.exports = { MealCategory, MealCategorySchema };