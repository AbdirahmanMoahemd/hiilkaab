const mongoose = require("mongoose");

const sliderSchema = mongoose.Schema({
    
    images: [
        {
          type: String,
          required: true,
        },
      ],
   
})


sliderSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id };
});

const Sliders = mongoose.model('Sliders', sliderSchema)

module.exports = { Sliders, sliderSchema };