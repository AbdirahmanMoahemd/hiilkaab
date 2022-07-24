const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    
})


subCategorySchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id }; 
});


const SubCategory = mongoose.model('SubCategory', subCategorySchema)
module.exports = { SubCategory, subCategorySchema };