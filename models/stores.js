const mongoose = require("mongoose");

const StoreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    storetype: {
        type: String,
        required: true,
        unique: true
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


StoreSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id }; 
});


const Store = mongoose.model('Store', StoreSchema)
module.exports = { Store, StoreSchema };