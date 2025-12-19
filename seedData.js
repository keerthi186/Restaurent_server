import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Restaurant from './models/Restaurant.js';
import MenuItem from './models/MenuItem.js';
import connectDB from './config/db.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await User.deleteMany({});
    await Restaurant.deleteMany({});
    await MenuItem.deleteMany({});
    
    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@eazydiner.com',
      password: 'admin123',
      role: 'admin'
    });
    
    // Create sample user
    const user = await User.create({
      name: 'John Doe',
      email: 'user@example.com',
      password: 'user123',
      role: 'user'
    });
    
    // Create sample restaurants
    const restaurants = [
      {
        name: 'Spice Garden',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
        cuisine: 'Indian, Chinese',
        rating: 4.2,
        location: 'RS Puram, Coimbatore',
        price: '₹500 for two',
        offers: '20% OFF',
        description: 'Authentic Indian and Chinese cuisine with a modern twist. Known for their spicy curries and fresh ingredients.',
        featured: true
      },
      {
        name: 'The French Door',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
        cuisine: 'Continental, Italian',
        rating: 4.5,
        location: 'Race Course, Coimbatore',
        price: '₹800 for two',
        offers: '',
        description: 'Fine dining restaurant serving Continental and Italian dishes in an elegant atmosphere.',
        featured: true
      },
      {
        name: 'Dakshin',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
        cuisine: 'South Indian',
        rating: 4.3,
        location: 'Gandhipuram, Coimbatore',
        price: '₹400 for two',
        offers: '15% OFF',
        description: 'Traditional South Indian restaurant serving authentic regional specialties.',
        featured: true
      },
      {
        name: 'Bamboo Rice',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop',
        cuisine: 'Asian, Thai',
        rating: 4.1,
        location: 'Peelamedu, Coimbatore',
        price: '₹600 for two',
        offers: '25% OFF',
        description: 'Asian fusion restaurant with a focus on Thai and Vietnamese cuisine.',
        featured: false
      },
      {
        name: 'Royal Treat',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
        cuisine: 'North Indian, Mughlai',
        rating: 4.4,
        location: 'Saibaba Colony, Coimbatore',
        price: '₹700 for two',
        offers: '',
        description: 'Royal dining experience with authentic North Indian and Mughlai dishes.',
        featured: true
      },
      {
        name: 'Coastal Curry',
        image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop',
        cuisine: 'Seafood, Kerala',
        rating: 4.0,
        location: 'Singanallur, Coimbatore',
        price: '₹550 for two',
        offers: '10% OFF',
        description: 'Fresh seafood and Kerala specialties in a coastal-themed setting.',
        featured: false
      }
    ];
    
    const createdRestaurants = await Restaurant.insertMany(restaurants);
    
    // Create sample menu items
    const menuItems = [];
    
    createdRestaurants.forEach((restaurant, index) => {
      const restaurantMenus = {
        0: [ // Spice Garden - Indian, Chinese
          { name: 'Chicken Biryani', description: 'Aromatic basmati rice with tender chicken pieces', price: 280, category: 'Main Course', isVeg: false, spiceLevel: 'Medium' },
          { name: 'Paneer Butter Masala', description: 'Creamy tomato curry with cottage cheese', price: 220, category: 'Main Course', isVeg: true, spiceLevel: 'Mild' },
          { name: 'Hakka Noodles', description: 'Stir-fried noodles with vegetables', price: 180, category: 'Chinese', isVeg: true, spiceLevel: 'Medium' },
          { name: 'Chicken Manchurian', description: 'Indo-Chinese chicken in spicy sauce', price: 240, category: 'Chinese', isVeg: false, spiceLevel: 'Spicy' },
          { name: 'Gulab Jamun', description: 'Sweet milk dumplings in sugar syrup', price: 80, category: 'Desserts', isVeg: true }
        ],
        1: [ // The French Door - Continental, Italian
          { name: 'Margherita Pizza', description: 'Classic pizza with tomato, mozzarella and basil', price: 320, category: 'Main Course', isVeg: true },
          { name: 'Chicken Alfredo Pasta', description: 'Creamy pasta with grilled chicken', price: 380, category: 'Main Course', isVeg: false },
          { name: 'Caesar Salad', description: 'Fresh romaine lettuce with caesar dressing', price: 180, category: 'Appetizers', isVeg: true },
          { name: 'Tiramisu', description: 'Classic Italian coffee-flavored dessert', price: 150, category: 'Desserts', isVeg: true },
          { name: 'Garlic Bread', description: 'Toasted bread with garlic butter', price: 120, category: 'Appetizers', isVeg: true }
        ],
        2: [ // Dakshin - South Indian
          { name: 'Masala Dosa', description: 'Crispy crepe with spiced potato filling', price: 120, category: 'Main Course', isVeg: true, spiceLevel: 'Medium' },
          { name: 'Idli Sambar', description: 'Steamed rice cakes with lentil curry', price: 80, category: 'Main Course', isVeg: true, spiceLevel: 'Mild' },
          { name: 'Chicken Chettinad', description: 'Spicy South Indian chicken curry', price: 280, category: 'Main Course', isVeg: false, spiceLevel: 'Extra Spicy' },
          { name: 'Filter Coffee', description: 'Traditional South Indian coffee', price: 40, category: 'Beverages', isVeg: true },
          { name: 'Rava Kesari', description: 'Sweet semolina dessert', price: 60, category: 'Desserts', isVeg: true }
        ]
      };
      
      const restaurantMenu = restaurantMenus[index] || restaurantMenus[0];
      
      restaurantMenu.forEach(item => {
        menuItems.push({
          ...item,
          restaurantId: restaurant._id,
          image: `https://images.unsplash.com/photo-${1565299624946 + Math.floor(Math.random() * 1000)}?w=300&h=200&fit=crop`,
          rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3-5
          preparationTime: Math.floor(Math.random() * 20) + 15, // 15-35 minutes
          isAvailable: true
        });
      });
    });
    
    await MenuItem.insertMany(menuItems);
    
    console.log('Sample data seeded successfully!');
    console.log('Admin credentials: admin@eazydiner.com / admin123');
    console.log('User credentials: user@example.com / user123');
    console.log(`Created ${createdRestaurants.length} restaurants with ${menuItems.length} menu items`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();