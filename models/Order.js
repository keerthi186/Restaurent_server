import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  },
  specialInstructions: {
    type: String,
    default: ''
  }
});

const orderSchema = new mongoose.Schema({
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
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'pending'
  },
  orderType: {
    type: String,
    enum: ['delivery', 'pickup', 'dine-in'],
    required: true
  },
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    phone: String
  },
  customerName: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  estimatedDeliveryTime: {
    type: Date
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'upi', 'wallet'],
    default: 'cash'
  },
  discount: {
    type: Number,
    default: 0
  },
  deliveryFee: {
    type: Number,
    default: 0
  },
  tax: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Order', orderSchema);