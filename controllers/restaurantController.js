import Restaurant from '../models/Restaurant.js';

export const getRestaurants = async (req, res) => {
  try {
    const { cuisine, location, featured } = req.query;
    let query = {};

    if (cuisine) query.cuisine = { $regex: cuisine, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };
    if (featured) query.featured = featured === 'true';

    const restaurants = await Restaurant.find(query);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};