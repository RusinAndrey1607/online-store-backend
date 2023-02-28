const uuid = require("uuid")
const path = require("path")
const { Device } = require("../db/models/models")
const ApiError = require("../error/ApiError")

class DeviceController {
    async create(req, res, next) {
        try {
            const { name, price, brandId, typeId, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            console.log(name, price, brandId)
            const device = await Device.create({ name, price, brandId, typeId, img: fileName })
            return res.json(device)
        } catch (error) {
            console.log(error);
            return next(ApiError.badRequest(error.message))
        }

    }
    async getAll(req, res, next) {
        let { brandId, typeId, limit, page } = req.query
        page = page || 1
        limit = limit || 3

        let offset = page * limit - limit
        console.log(req.query);
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({offset,limit})
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({
                where: {
                    typeId
                },
                offset,
                limit
            })
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({
                where: {
                    brandId
                },
                offset,
                limit
            })
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({
                where: {
                    brandId,
                    typeId
                },
                offset,
                limit
            })
        }
        return res.json(devices)

    }
    async getOne(req, res, next) {
        return
    }
    async delete(req, res, next) {

    }
}

module.exports = new DeviceController()
