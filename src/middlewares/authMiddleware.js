const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    if (req.method == 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return res.status(401).json({ message: "User isn't authorized" })
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET) 
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: "User isn't authorized" })
    }
}   