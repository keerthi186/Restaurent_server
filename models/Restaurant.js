import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  cuisine: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  offers: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('Restaurant', restaurantSchema);