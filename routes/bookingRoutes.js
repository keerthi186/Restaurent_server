import express from 'express';
import {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus
} from '../controllers/bookingController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, createBooking)
  .get(protect, admin, getAllBookings);

router.get('/user/:userId', protect, getUserBookings);
router.put('/:id/status', protect, admin, updateBookingStatus);

export default router;