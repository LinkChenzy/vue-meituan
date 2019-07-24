import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Cart = new Schema({
  id: {
    type: String,
    required:true
  },
  detail: {
    type: Array,
    require: true
  },
  cartNo:{
    type:String,
    require:true
  },
  user:{
      type:String,
      required:true
  },
  time:{
      type:String,
      required:true
  }
})

export default mongoose.model('Cart', Cart)
