import Cart from '../models/Cart.js';
import MenuItem from '../models/MenuItem.js';

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id })
      .populate('items.menuItem', 'name price image restaurantId')
      .populate('restaurantId', 'name location');
    
    if (!cart) {
      return res.json({ items: [], totalAmount: 0 });
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { menuItemId, quantity, specialInstructions } = req.body;
    
    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    let cart = await Cart.findOne({ userId: req.user._id });
    
    if (!cart) {
      cart = new Cart({
        userId: req.user._id,
        restaurantId: menuItem.restaurantId,
        items: [],
        totalAmount: 0
      });
    }
    
    // Check if item from same restaurant
    if (cart.restaurantId && cart.restaurantId.toString() !== menuItem.restaurantId.toString()) {
      return res.status(400).json({ 
        message: 'You can only order from one restaurant at a time. Clear your cart to order from a different restaurant.' 
      });
    }
    
    cart.restaurantId = menuItem.restaurantId;
    
    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.menuItem.toString() === menuItemId
    );
    
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].specialInstructions = specialInstructions || '';
    } else {
      cart.items.push({
        menuItem: menuItemId,
        quantity,
        specialInstructions: specialInstructions || ''
      });
    }
    
    // Calculate total amount
    await cart.populate('items.menuItem', 'price');
    cart.totalAmount = cart.items.reduce((total, item) => {
      return total + (item.menuItem.price * item.quantity);
    }, 0);
    
    await cart.save();
    
    const populatedCart = await Cart.findById(cart._id)
      .populate('items.menuItem', 'name price image')
      .populate('restaurantId', 'name location');
    
    res.json(populatedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { quantity, specialInstructions } = req.body;
    const { itemId } = req.params;
    
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    
    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
      if (specialInstructions !== undefined) {
        cart.items[itemIndex].specialInstructions = specialInstructions;
      }
    }
    
    // Recalculate total
    await cart.populate('items.menuItem', 'price');
    cart.totalAmount = cart.items.reduce((total, item) => {
      return total + (item.menuItem.price * item.quantity);
    }, 0);
    
    await cart.save();
    
    const populatedCart = await Cart.findById(cart._id)
      .populate('items.menuItem', 'name price image')
      .populate('restaurantId', 'name location');
    
    res.json(populatedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    
    // Recalculate total
    await cart.populate('items.menuItem', 'price');
    cart.totalAmount = cart.items.reduce((total, item) => {
      return total + (item.menuItem.price * item.quantity);
    }, 0);
    
    await cart.save();
    
    const populatedCart = await Cart.findById(cart._id)
      .populate('items.menuItem', 'name price image')
      .populate('restaurantId', 'name location');
    
    res.json(populatedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user._id });
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};