const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("user",{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    email:{type:DataTypes.STRING,unique:true,allowNull:false},
    password:{type:DataTypes.STRING,unique:false,allowNull:false},
    role:{type:DataTypes.STRING,unique:false,allowNull:false,defaultValue:"USER"},
    
})
const Basket = db.define("basket",{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
})

const BasketDevice = db.define("basket_device",{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
})

const Device = db.define("device",{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name:{type:DataTypes.STRING,unique:true, allowNull:false},
    price:{type:DataTypes.INTEGER,allowNull:false},
    rating:{type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
    img:{type:DataTypes.STRING,allowNull:false},
})

const Type = db.define("type",{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name:{type:DataTypes.STRING,unique:true, allowNull:false},

})

const Brand = db.define("brand",{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name:{type:DataTypes.STRING,unique:true, allowNull:false},

})
const Rating = db.define("rating",{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    rate:{type:DataTypes.INTEGER,allowNull:false,defaultValue:0},

})
const DeviceInfo = db.define("device_info",{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title:{type:DataTypes.STRING,allowNull:false},
    description:{type:DataTypes.STRING,allowNull:false},
})

const TypeBrand = db.define("type_brand",{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},

})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Device.hasMany(DeviceInfo,{as:"info"})
DeviceInfo.belongsTo(Device)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Type.belongsToMany(Brand, {through:TypeBrand})
Brand.belongsToMany(Type, {through:TypeBrand})
module.exports = {User,Basket,BasketDevice,Brand,Type,Device,DeviceInfo,Rating,TypeBrand}