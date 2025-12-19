import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Restaurant from './models/Restaurant.js';
import MenuItem from './models/MenuItem.js';
import connectDB from './config/db.js';

dotenv.config();

const seedEnhancedData = async () => {
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
    
    // Enhanced menu items for each restaurant
    const menuItems = [];
    
    // Spice Garden - Indian, Chinese
    const spiceGardenMenus = [
      { name: 'Chicken Biryani', description: 'Aromatic basmati rice with tender chicken pieces and exotic spices', price: 280, category: 'Main Course', isVeg: false, spiceLevel: 'Medium', image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=300&h=200&fit=crop' },
      { name: 'Paneer Butter Masala', description: 'Creamy tomato curry with cottage cheese cubes', price: 220, category: 'Main Course', isVeg: true, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=200&fit=crop' },
      { name: 'Hakka Noodles', description: 'Stir-fried noodles with fresh vegetables and soy sauce', price: 180, category: 'Chinese', isVeg: true, spiceLevel: 'Medium', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=300&h=200&fit=crop' },
      { name: 'Chicken Manchurian', description: 'Indo-Chinese chicken balls in spicy tangy sauce', price: 240, category: 'Chinese', isVeg: false, spiceLevel: 'Spicy', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=200&fit=crop' },
      { name: 'Vegetable Spring Rolls', description: 'Crispy rolls filled with fresh vegetables', price: 150, category: 'Appetizers', isVeg: true, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop' },
      { name: 'Gulab Jamun', description: 'Sweet milk dumplings in sugar syrup', price: 80, category: 'Desserts', isVeg: true, image: 'https://images.unsplash.com/photo-1571167530149-c72f2b2c3f44?w=300&h=200&fit=crop' },
      { name: 'Masala Chai', description: 'Traditional Indian spiced tea', price: 40, category: 'Beverages', isVeg: true, image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=300&h=200&fit=crop' }
    ];

    // The French Door - Continental, Italian
    const frenchDoorMenus = [
      { name: 'Margherita Pizza', description: 'Classic pizza with tomato, mozzarella and fresh basil', price: 320, category: 'Main Course', isVeg: true, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=200&fit=crop' },
      { name: 'Chicken Alfredo Pasta', description: 'Creamy pasta with grilled chicken and parmesan', price: 380, category: 'Main Course', isVeg: false, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop' },
      { name: 'Caesar Salad', description: 'Fresh romaine lettuce with caesar dressing and croutons', price: 180, category: 'Appetizers', isVeg: true, image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop' },
      { name: 'Grilled Salmon', description: 'Fresh Atlantic salmon with herbs and lemon', price: 450, category: 'Main Course', isVeg: false, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop' },
      { name: 'Tiramisu', description: 'Classic Italian coffee-flavored dessert', price: 150, category: 'Desserts', isVeg: true, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop' },
      { name: 'Garlic Bread', description: 'Toasted bread with garlic butter and herbs', price: 120, category: 'Appetizers', isVeg: true, image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=300&h=200&fit=crop' },
      { name: 'Red Wine', description: 'Premium Italian red wine', price: 200, category: 'Beverages', isVeg: true, image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300&h=200&fit=crop' }
    ];

    // Dakshin - South Indian
    const dakshinMenus = [
      { name: 'Masala Dosa', description: 'Crispy crepe with spiced potato filling and chutneys', price: 120, category: 'Main Course', isVeg: true, spiceLevel: 'Medium', image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=300&h=200&fit=crop' },
      { name: 'Idli Sambar', description: 'Steamed rice cakes with lentil curry and coconut chutney', price: 80, category: 'Main Course', isVeg: true, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&h=200&fit=crop' },
      { name: 'Chicken Chettinad', description: 'Spicy South Indian chicken curry with aromatic spices', price: 280, category: 'Main Course', isVeg: false, spiceLevel: 'Extra Spicy', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop' },
      { name: 'Uttapam', description: 'Thick pancake topped with vegetables', price: 100, category: 'Main Course', isVeg: true, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=200&fit=crop' },
      { name: 'Coconut Rice', description: 'Fragrant rice cooked with coconut and curry leaves', price: 90, category: 'Main Course', isVeg: true, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&h=200&fit=crop' },
      { name: 'Filter Coffee', description: 'Traditional South Indian coffee', price: 40, category: 'Beverages', isVeg: true, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop' },
      { name: 'Rava Kesari', description: 'Sweet semolina dessert with ghee and nuts', price: 60, category: 'Desserts', isVeg: true, image: 'https://images.unsplash.com/photo-1571167530149-c72f2b2c3f44?w=300&h=200&fit=crop' }
    ];

    // Bamboo Rice - Asian, Thai
    const bambooRiceMenus = [
      { name: 'Pad Thai', description: 'Stir-fried rice noodles with tamarind and peanuts', price: 250, category: 'Main Course', isVeg: false, spiceLevel: 'Medium', image: 'https://images.unsplash.com/photo-1559314809-0f31657def5e?w=300&h=200&fit=crop' },
      { name: 'Green Curry', description: 'Thai green curry with coconut milk and vegetables', price: 220, category: 'Main Course', isVeg: true, spiceLevel: 'Spicy', image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=300&h=200&fit=crop' },
      { name: 'Tom Yum Soup', description: 'Spicy and sour Thai soup with lemongrass', price: 180, category: 'Appetizers', isVeg: false, spiceLevel: 'Spicy', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=200&fit=crop' },
      { name: 'Mango Sticky Rice', description: 'Sweet sticky rice with fresh mango slices', price: 120, category: 'Desserts', isVeg: true, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=200&fit=crop' },
      { name: 'Thai Iced Tea', description: 'Sweet and creamy Thai tea with condensed milk', price: 80, category: 'Beverages', isVeg: true, image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=300&h=200&fit=crop' }
    ];

    // Royal Treat - North Indian, Mughlai
    const royalTreatMenus = [
      { name: 'Butter Chicken', description: 'Creamy tomato-based chicken curry with aromatic spices', price: 320, category: 'Main Course', isVeg: false, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop' },
      { name: 'Dal Makhani', description: 'Rich black lentils cooked with butter and cream', price: 180, category: 'Main Course', isVeg: true, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop' },
      { name: 'Naan Bread', description: 'Soft leavened bread baked in tandoor', price: 60, category: 'Appetizers', isVeg: true, image: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=300&h=200&fit=crop' },
      { name: 'Biryani Lucknowi', description: 'Fragrant rice dish with tender mutton and saffron', price: 350, category: 'Main Course', isVeg: false, spiceLevel: 'Medium', image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=300&h=200&fit=crop' },
      { name: 'Kulfi', description: 'Traditional Indian ice cream with cardamom', price: 90, category: 'Desserts', isVeg: true, image: 'https://images.unsplash.com/photo-1571167530149-c72f2b2c3f44?w=300&h=200&fit=crop' }
    ];

    // Coastal Curry - Seafood, Kerala
    const coastalCurryMenus = [
      { name: 'Fish Curry', description: 'Kerala-style fish curry with coconut milk', price: 280, category: 'Main Course', isVeg: false, spiceLevel: 'Medium', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop' },
      { name: 'Prawn Fry', description: 'Spicy fried prawns with Kerala spices', price: 320, category: 'Main Course', isVeg: false, spiceLevel: 'Spicy', image: 'https://images.unsplash.com/photo-1565299585323-38174c4a6706?w=300&h=200&fit=crop' },
      { name: 'Appam', description: 'Fermented rice pancakes with coconut milk', price: 80, category: 'Main Course', isVeg: true, spiceLevel: 'Mild', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=200&fit=crop' },
      { name: 'Coconut Water', description: 'Fresh tender coconut water', price: 50, category: 'Beverages', isVeg: true, image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300&h=200&fit=crop' }
    ];

    const allMenus = [
      spiceGardenMenus, frenchDoorMenus, dakshinMenus, 
      bambooRiceMenus, royalTreatMenus, coastalCurryMenus
    ];

    // Create menu items for each restaurant
    createdRestaurants.forEach((restaurant, index) => {
      const restaurantMenu = allMenus[index] || spiceGardenMenus;
      
      restaurantMenu.forEach(item => {
        menuItems.push({
          ...item,
          restaurantId: restaurant._id,
          rating: (Math.random() * 2 + 3).toFixed(1),
          preparationTime: Math.floor(Math.random() * 20) + 15,
          isAvailable: true
        });
      });
    });
    
    await MenuItem.insertMany(menuItems);
    
    console.log('Enhanced sample data seeded successfully!');
    console.log('Admin credentials: admin@eazydiner.com / admin123');
    console.log('User credentials: user@example.com / user123');
    console.log(`Created ${createdRestaurants.length} restaurants with ${menuItems.length} menu items`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding enhanced data:', error);
    process.exit(1);
  }
};

seedEnhancedData();