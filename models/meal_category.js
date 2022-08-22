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




const MealCategory = mongoose.model('MealCategory', MealCategorySchema)
module.exports = { MealCategory, MealCategorySchema };