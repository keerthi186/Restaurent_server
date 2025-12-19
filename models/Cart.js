import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  specialInstructions: {
    type: String,
    default: ''
  }
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  items: [cartItemSchema],
  totalAmount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Cart', cartSchema);