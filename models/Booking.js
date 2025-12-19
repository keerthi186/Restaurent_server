import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  guests: {
    type: Number,
    required: true,
    min: 1,
    max: 20
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  customerName: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Booking', bookingSchema);