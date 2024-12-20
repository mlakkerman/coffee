const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
})

const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Products = sequelize.define('products', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
})

const Review = sequelize.define('review', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
})

const Categories = sequelize.define('categories', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
})

const ProductBasket = sequelize.define('product_basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 }, // Количество товара в корзине
})

const ProductInfo = sequelize.define('product_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
})

User.hasMany(Review)
Review.belongsTo(User)

Products.hasMany(Review)
Review.belongsTo(Products);

Categories.hasOne(Products);
Products.belongsTo(Categories);

Products.hasMany(ProductInfo, {as: 'info'});
ProductInfo.belongsTo(Products)

User.hasOne(Basket);
Basket.belongsTo(User);

Products.belongsToMany(Basket, { through: ProductBasket });
Basket.belongsToMany(Products, { through: ProductBasket });

User.belongsToMany(Products, { through: ProductBasket, foreignKey: 'userId' });
Products.belongsToMany(User, { through: ProductBasket, foreignKey: 'productId' });

module.exports = {
    User, // +
    Products, // +
    Review, // +
    Categories, // +
    ProductBasket, // + 
    ProductInfo, // +
    Basket // +
}