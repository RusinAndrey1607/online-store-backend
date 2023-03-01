const Router = require("express")
const brandController = require("../controllers/brandController")
const router =new Router()
const roleMiddleware = require("../middlewares/roleMiddleware")

router.post("/",roleMiddleware("ADMIN"),brandController.create)
router.get("/",brandController.getAll)

module.exports = router