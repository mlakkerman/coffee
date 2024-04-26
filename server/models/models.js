const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
})

const Events = sequelize.define('events', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE},
})

const Address = sequelize.define('address', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    region: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    street: { type: DataTypes.STRING, allowNull: false },
    house: { type: DataTypes.STRING, allowNull: false },
    appartament: { type: DataTypes.STRING},
})

const Review = sequelize.define('review', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
})

const Sponsors = sequelize.define('sponsors', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    logo: { type: DataTypes.STRING, allowNull: false },
    websiteUrl: { type: DataTypes.STRING, allowNull: false },
})

const Speakers = sequelize.define('speakers', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    surname: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    patronymic: { type: DataTypes.STRING},
    bio: { type: DataTypes.STRING },
})

const Categories = sequelize.define('categories', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
})

const Favorites = sequelize.define('favorites', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const EventInfo = sequelize.define('event_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
})

User.hasMany(Review)
Review.belongsTo(User)

Events.hasMany(Review)
Review.belongsTo(Events);

Address.hasOne(Events);
Events.belongsTo(Address);

Sponsors.hasMany(Events);
Events.belongsTo(Sponsors);

Categories.hasOne(Events);
Events.belongsTo(Categories);

Events.hasMany(EventInfo, {as: 'info'});
EventInfo.belongsTo(Events)

Speakers.hasOne(Events);
Events.belongsTo(Speakers);

Events.belongsToMany(User, { through: Favorites });
User.belongsToMany(Events, { through: Favorites });

module.exports = {
    User,
    Events,
    Address,
    Review,
    Sponsors,
    Speakers,
    Categories,
    Favorites,
    EventInfo
}

// const Basket = sequelize.define('basket', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// })

// const BasketDevice = sequelize.define('basket_device', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// })

// const Device = sequelize.define('device', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     name: {type: DataTypes.STRING, unique: true, allowNull: false},
//     price: {type: DataTypes.INTEGER, allowNull: false},
//     rating: {type: DataTypes.INTEGER, defaultValue: 0},
//     img: {type: DataTypes.STRING, allowNull: false},
// })

// const Type = sequelize.define('type', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     name: {type: DataTypes.STRING, unique: true, allowNull: false},
// })

// const Brand = sequelize.define('brand', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     name: {type: DataTypes.STRING, unique: true, allowNull: false},
// })

// const Rating = sequelize.define('rating', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     rate: {type: DataTypes.INTEGER, allowNull: false},
// })

// const DeviceInfo = sequelize.define('device_info', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     title: {type: DataTypes.STRING, allowNull: false},
//     description: {type: DataTypes.STRING, allowNull: false},
// })

// const TypeBrand = sequelize.define('type_brand', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// })


// User.hasOne(Basket)
// Basket.belongsTo(User)

// User.hasMany(Rating)
// Rating.belongsTo(User)

// Basket.hasMany(BasketDevice)
// BasketDevice.belongsTo(Basket)

// Type.hasMany(Device)
// Device.belongsTo(Type)

// Brand.hasMany(Device)
// Device.belongsTo(Brand)

// Device.hasMany(Rating)
// Rating.belongsTo(Device)

// Device.hasMany(BasketDevice)
// BasketDevice.belongsTo(Device)

// Device.hasMany(DeviceInfo, {as: 'info'});
// DeviceInfo.belongsTo(Device)

// Type.belongsToMany(Brand, {through: TypeBrand })
// Brand.belongsToMany(Type, {through: TypeBrand })

// module.exports = {
//     User,
//     Basket,
//     BasketDevice,
//     Device,
//     Type,
//     Brand,
//     Rating,
//     TypeBrand,
//     DeviceInfo
// }





