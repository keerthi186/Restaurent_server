import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import MenuItem from '../models/MenuItem.js';

export const createOrder = async (req, res) => {
  try {
    const { items, orderType, deliveryAddress, customerName, customerPhone, paymentMethod } = req.body;
    
    // Calculate total amount
    let totalAmount = 0;
    const orderItems = [];
    
    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem) {
        return res.status(404).json({ message: `Menu item ${item.menuItem} not found` });
      }
      
      const itemTotal = menuItem.price * item.quantity;
      totalAmount += itemTotal;
      
      orderItems.push({
        menuItem: item.menuItem,
        quantity: item.quantity,
        price: menuItem.price,
        specialInstructions: item.specialInstructions || ''
      });
    }
    
    // Add tax and delivery fee
    const tax = totalAmount * 0.18; // 18% GST
    const deliveryFee = orderType === 'delivery' ? 50 : 0;
    const finalAmount = totalAmount + tax + deliveryFee;
    
    // Set estimated delivery time
    const estimatedDeliveryTime = new Date();
    estimatedDeliveryTime.setMinutes(estimatedDeliveryTime.getMinutes() + 45);
    
    const order = await Order.create({
      userId: req.user._id,
      restaurantId: orderItems[0] ? (await MenuItem.findById(orderItems[0].menuItem)).restaurantId : null,
      items: orderItems,
      totalAmount: finalAmount,
      orderType,
      deliveryAddress: orderType === 'delivery' ? deliveryAddress : undefined,
      customerName,
      customerPhone,
      estimatedDeliveryTime,
      paymentMethod,
      tax,
      deliveryFee
    });
    
    // Clear user's cart after successful order
    await Cart.findOneAndDelete({ userId: req.user._id });
    
    const populatedOrder = await Order.findById(order._id)
      .populate('restaurantId', 'name location')
      .populate('items.menuItem', 'name price image')
      .populate('userId', 'name email');
    
    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate('restaurantId', 'name location image')
      .populate('items.menuItem', 'name price image')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const { status, restaurantId } = req.query;
    let query = {};
    
    if (status) query.status = status;
    if (restaurantId) query.restaurantId = restaurantId;
    
    const orders = await Order.find(query)
      .populate('restaurantId', 'name location')
      .populate('items.menuItem', 'name price')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('restaurantId', 'name location')
     .populate('items.menuItem', 'name price')
     .populate('userId', 'name email');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('restaurantId', 'name location phone')
      .populate('items.menuItem', 'name price image description')
      .populate('userId', 'name email');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};