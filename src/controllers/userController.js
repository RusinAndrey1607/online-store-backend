const ApiError = require("../error/ApiError")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { User, Basket } = require("../db/models/models")

const generateJwt = (id, email, role) => {
    return jwt.sign({ id, role, email }, process.env.JWT_SECRET, { expiresIn: "24h" })
}
class UserController {
    async registration(req, res, next) {
        let { email, password, role } = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Incorrect email or password'))
        }
        const candidate = await User.findOne({
            where: {
                email
            }
        })
        if (candidate) {
            return next(ApiError.badRequest('Email already used'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ email, password: hashPassword, role })
        const basket = await Basket.create({ userId: user.id })
        const token = generateJwt(user.id, email, role)
        return res.json({ token })
    }
    async login(req, res, next) {
        let { email, password, role } = req.body
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) {
            return next(ApiError.badRequest(`User with email ${email} not found`))
        }
        let comparePassword = await bcrypt.compare(password, user.password)

        if(!comparePassword){
            return next(ApiError.badRequest(`Incorrect password`))
        }

        const token = generateJwt(user.id, email, role)
        return res.json({ token })


    }
    async check(req, res, next) {
        const {id,email,role} = req.user
        const token = generateJwt(id,role,email)
        return res.json({token})
    }
}

module.exports = new UserController()
