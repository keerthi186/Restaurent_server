import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Starters', 'Chinese', 'Indian', 'Continental']
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  isVeg: {
    type: Boolean,
    default: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  preparationTime: {
    type: Number,
    default: 15 // in minutes
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  spiceLevel: {
    type: String,
    enum: ['Mild', 'Medium', 'Spicy', 'Extra Spicy'],
    default: 'Medium'
  }
}, {
  timestamps: true
});

export default mongoose.model('MenuItem', menuItemSchema);