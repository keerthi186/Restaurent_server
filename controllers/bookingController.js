import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      userId: req.user._id
    });
    
    const populatedBooking = await Booking.findById(booking._id)
      .populate('restaurantId', 'name location')
      .populate('userId', 'name email');
    
    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate('restaurantId', 'name location image')
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('restaurantId', 'name location')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('restaurantId', 'name location')
     .populate('userId', 'name email');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};