import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100
  },
  description: {
    type: String,
    required: true,
    minLength: 20,
    maxLength: 500
  },
  images: {
    type: [
      {
        type: String
      }
    ],
    validate: {
      validator: images => images.length <= 5,
      message: 'A product can has atmost 5 images'
    }
  },

  price:{
    amount:{
        type:Number,
        requried:true
    },
    currency:{
        type:String,
        enum:["INR", "USD"],
        default:"INR"
    }
  },
  sizes:[{
    size:{
        type:String,
        enum:["XS","S","M","L","XL","XXL"],
        required:true
    }
  }],

  seller:{
    type:mongoose.type.ObjectId,
    ref:"users",
    required:true
  }
})

const productModel = mongoose.model("products", productSchema)
export default productModel