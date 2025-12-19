import MenuItem from '../models/MenuItem.js';

export const getMenuItems = async (req, res) => {
  try {
    const { restaurantId, category, isVeg } = req.query;
    let query = {};

    if (restaurantId) query.restaurantId = restaurantId;
    if (category) query.category = category;
    if (isVeg !== undefined) query.isVeg = isVeg === 'true';
    query.isAvailable = true;

    const menuItems = await MenuItem.find(query).populate('restaurantId', 'name');
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id).populate('restaurantId');
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.create(req.body);
    const populatedItem = await MenuItem.findById(menuItem._id).populate('restaurantId', 'name');
    res.status(201).json(populatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('restaurantId', 'name');
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMenuByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const menuItems = await MenuItem.find({ 
      restaurantId, 
      isAvailable: true 
    }).populate('restaurantId', 'name');
    
    // Group by category
    const groupedMenu = menuItems.reduce((acc, item) => {
      const category = item.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});
    
    res.json(groupedMenu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};