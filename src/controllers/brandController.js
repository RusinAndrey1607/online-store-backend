const {Brand} = require("../db/models/models")
class BrandController{
    async create(req, res, next) {
        const brand = await Brand.create(req.body)
        return res.json(brand)
    }
    async getAll(req, res, next) {
        const brands = await Brand.findAll()
        return res.json(brands)
        
    }
}

module.exports = new BrandController()
