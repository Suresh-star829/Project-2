require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define schemas (simplified versions)
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    addresses: [{
        type: { type: String, default: 'home' },
        street: String,
        city: String,
        state: String,
        pincode: String,
        country: { type: String, default: 'India' },
        isDefault: Boolean
    }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    createdAt: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    originalPrice: Number,
    category: String,
    sizes: [String],
    colors: [String],
    icon: String,
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    tags: [String],
    discount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

// Sample data
const sampleUsers = [
    {
        name: 'Priya Sharma',
        email: 'priya.sharma@email.com',
        password: 'password123',
        phone: '+91 9876543210',
        addresses: [{
            type: 'home',
            street: '123 MG Road',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400001',
            country: 'India',
            isDefault: true
        }]
    },
    {
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@email.com',
        password: 'password123',
        phone: '+91 9876543211',
        addresses: [{
            type: 'home',
            street: '456 Park Street',
            city: 'Delhi',
            state: 'Delhi',
            pincode: '110001',
            country: 'India',
            isDefault: true
        }]
    },
    {
        name: 'Anita Patel',
        email: 'anita.patel@email.com',
        password: 'password123',
        phone: '+91 9876543212',
        addresses: [{
            type: 'home',
            street: '789 Brigade Road',
            city: 'Bangalore',
            state: 'Karnataka',
            pincode: '560001',
            country: 'India',
            isDefault: true
        }]
    }
];

const sampleProducts = [
    {
        name: 'Summer Floral Dress',
        description: 'Beautiful floral dress perfect for summer occasions. Made with breathable cotton fabric, this dress features a flattering A-line cut and vibrant floral patterns. Perfect for casual outings, brunches, or weekend getaways.',
        price: 2499,
        originalPrice: 2999,
        category: 'dresses',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['#ff6b9d', '#4facfe', '#43e97b', '#fa709a'],
        icon: '👗',
        rating: 4.5,
        reviewCount: 120,
        stock: 50,
        tags: ['summer', 'floral', 'casual', 'cotton', 'breathable'],
        discount: 17
    },
    {
        name: 'Silk Blouse',
        description: 'Elegant silk blouse for formal occasions. Crafted from premium silk with a sophisticated design, this blouse is perfect for office wear or formal events. Features mother-of-pearl buttons and French seams.',
        price: 1899,
        originalPrice: 1899,
        category: 'tops',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#ff6b9d', '#4facfe', '#43e97b'],
        icon: '👚',
        rating: 4.8,
        reviewCount: 85,
        stock: 30,
        tags: ['silk', 'formal', 'elegant', 'premium', 'office']
    },
    {
        name: 'High-Waist Jeans',
        description: 'Comfortable high-waist jeans with perfect fit. Made from premium denim with stretch for comfort and mobility. Features a classic 5-pocket design and reinforced stitching for durability.',
        price: 2999,
        originalPrice: 2999,
        category: 'bottoms',
        sizes: ['28', '30', '32', '34', '36'],
        colors: ['#2c3e50', '#34495e'],
        icon: '👖',
        rating: 4.3,
        reviewCount: 200,
        stock: 25,
        tags: ['jeans', 'casual', 'comfortable', 'denim', 'high-waist']
    },
    {
        name: 'Designer Handbag',
        description: 'Luxury designer handbag for all occasions. Crafted from genuine leather with premium hardware. Features multiple compartments, adjustable straps, and comes with a dust bag.',
        price: 3499,
        originalPrice: 3499,
        category: 'accessories',
        sizes: ['One Size'],
        colors: ['#8b4513', '#000000', '#ff6b9d'],
        icon: '👜',
        rating: 4.7,
        reviewCount: 95,
        stock: 15,
        tags: ['luxury', 'handbag', 'designer', 'leather', 'premium']
    },
    {
        name: 'Elegant Evening Gown',
        description: 'Stunning evening gown for special occasions. Features intricate beadwork, flowing silhouette, and premium fabric. Perfect for weddings, galas, and formal events.',
        price: 4999,
        originalPrice: 4999,
        category: 'dresses',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['#000000', '#8b0000', '#4b0082'],
        icon: '👗',
        rating: 4.9,
        reviewCount: 67,
        stock: 10,
        tags: ['evening', 'formal', 'elegant', 'beadwork', 'special-occasion']
    },
    {
        name: 'Casual T-Shirt',
        description: 'Comfortable cotton t-shirt for everyday wear. Made from 100% organic cotton, this t-shirt is soft, breathable, and perfect for casual outings. Available in multiple colors.',
        price: 899,
        originalPrice: 899,
        category: 'tops',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['#ffffff', '#ff6b9d', '#4facfe', '#43e97b'],
        icon: '👕',
        rating: 4.2,
        reviewCount: 150,
        stock: 100,
        tags: ['casual', 'comfortable', 'cotton', 'organic', 'everyday']
    },
    {
        name: 'Printed Palazzo Pants',
        description: 'Flowy palazzo pants with beautiful prints. Made from lightweight fabric perfect for hot weather. Features elastic waistband and side pockets for convenience.',
        price: 1599,
        originalPrice: 1999,
        category: 'bottoms',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#ff6b9d', '#4facfe', '#43e97b', '#fa709a'],
        icon: '👖',
        rating: 4.4,
        reviewCount: 88,
        stock: 40,
        tags: ['palazzo', 'printed', 'flowy', 'comfortable', 'summer'],
        discount: 20
    },
    {
        name: 'Statement Earrings',
        description: 'Bold statement earrings to complete your look. Crafted with attention to detail, these earrings feature premium stones and gold-plated finish.',
        price: 799,
        originalPrice: 799,
        category: 'accessories',
        sizes: ['One Size'],
        colors: ['#ffd700', '#c0c0c0', '#ff6b9d'],
        icon: '💎',
        rating: 4.6,
        reviewCount: 75,
        stock: 60,
        tags: ['earrings', 'statement', 'jewelry', 'gold-plated', 'stones']
    },
    {
        name: 'Chiffon Scarf',
        description: 'Lightweight chiffon scarf perfect for any season. Features beautiful patterns and can be styled in multiple ways. Made from premium chiffon fabric.',
        price: 699,
        originalPrice: 899,
        category: 'accessories',
        sizes: ['One Size'],
        colors: ['#ff6b9d', '#4facfe', '#43e97b', '#fa709a'],
        icon: '🧣',
        rating: 4.3,
        reviewCount: 92,
        stock: 80,
        tags: ['scarf', 'chiffon', 'lightweight', 'versatile', 'patterns'],
        discount: 22
    },
    {
        name: 'Denim Jacket',
        description: 'Classic denim jacket for layering. Made from premium denim with vintage wash. Features button closure, chest pockets, and adjustable cuffs.',
        price: 2299,
        originalPrice: 2299,
        category: 'tops',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#4682b4', '#2f4f4f'],
        icon: '🧥',
        rating: 4.7,
        reviewCount: 110,
        stock: 35,
        tags: ['denim', 'jacket', 'layering', 'vintage', 'classic']
    }
];

async function seedDatabase() {
    try {
        console.log('🌱 Starting database seeding...');

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await User.deleteMany({});
        await Product.deleteMany({});

        // Hash passwords for users
        console.log('🔐 Hashing user passwords...');
        for (let user of sampleUsers) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }

        // Insert users
        console.log('👥 Creating sample users...');
        const createdUsers = await User.insertMany(sampleUsers);
        console.log(`✅ Created ${createdUsers.length} users`);

        // Insert products
        console.log('📦 Creating sample products...');
        const createdProducts = await Product.insertMany(sampleProducts);
        console.log(`✅ Created ${createdProducts.length} products`);

        // Add some products to users' wishlists
        console.log('❤️  Adding items to wishlists...');
        const user1 = createdUsers[0];
        const user2 = createdUsers[1];
        
        user1.wishlist = [createdProducts[0]._id, createdProducts[2]._id, createdProducts[4]._id];
        user2.wishlist = [createdProducts[1]._id, createdProducts[3]._id];
        
        await user1.save();
        await user2.save();

        console.log('🎉 Database seeding completed successfully!');
        console.log('\n📊 Summary:');
        console.log(`   • Users created: ${createdUsers.length}`);
        console.log(`   • Products created: ${createdProducts.length}`);
        console.log('\n🔑 Test Credentials:');
        console.log('   Email: priya.sharma@email.com');
        console.log('   Password: password123');
        console.log('\n🚀 You can now start the server and test the API!');

    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
}

// Check if script is run directly
if (require.main === module) {
    seedDatabase();
}

module.exports = { seedDatabase };