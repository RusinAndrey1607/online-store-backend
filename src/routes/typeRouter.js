const Router = require("express")

const typeController = require("../controllers/typeController")
const roleMiddleware = require("../middlewares/roleMiddleware")
const router =new Router()


router.post("/",roleMiddleware("ADMIN"),typeController.create)
router.get("/",typeController.getAll)

module.exports = router