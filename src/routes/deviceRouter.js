const Router = require("express")
const deviceController = require("../controllers/deviceController")
const roleMiddleware = require("../middlewares/roleMiddleware")


const router = new Router()

router.post("/",roleMiddleware("ADMIN"), deviceController.create)
router.get("/", deviceController.getAll)
router.get("/:id", deviceController.getOne)


module.exports = router