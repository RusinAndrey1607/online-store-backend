const ApiError = require("../error/ApiError")
class UserController{
    async registration(req, res, next) {
        
    }
    async login(req, res, next) {
        
    }
    async check(req, res, next) {
        const {id} = req.query
        if(!id){
            next(ApiError.badRequest("There should be id"))
        }
        return res.json("Hello")
    }
}

module.exports = new UserController()
