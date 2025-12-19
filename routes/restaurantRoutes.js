import express from 'express';
import {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
} from '../controllers/restaurantController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getRestaurants)
  .post(protect, admin, createRestaurant);

router.route('/:id')
  .get(getRestaurant)
  .put(protect, admin, updateRestaurant)
  .delete(protect, admin, deleteRestaurant);

export default router;